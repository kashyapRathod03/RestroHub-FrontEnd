import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  FiSmartphone,
  FiGlobe,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiMessageCircle,
  FiCheck,
  FiArrowRight,
  FiMenu,
  FiX,
  FiStar,
  FiCreditCard,
  FiRefreshCw,
  FiBell,
  FiChevronDown,
  FiPlay,
  FiUsers,
  FiMapPin,
  FiClock,
  FiMonitor,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaQrcode,
  FaUtensils,
  FaRupeeSign,
  FaLanguage,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import {
  SiSwiggy,
  SiZomato,
} from "react-icons/si";
import "../../styles/landing.css";

// ==================== CUSTOM HOOKS ====================
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return position;
};

// ==================== ANIMATED BACKGROUND ====================
const ParticleField = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="particle-field">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ==================== GRADIENT ORB ====================
const GradientOrb = ({ className }) => (
  <motion.div
    className={`gradient-orb ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  />
);

// ==================== 3D TILT CARD ====================
const TiltCard = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className || ""}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ==================== SECTION REVEAL ====================
const RevealSection = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

// ==================== TEXT REVEAL ====================
const TextReveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        className={className}
        initial={{ y: "110%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ==================== PHONE MOCKUP ====================
const PhoneMockup = ({ children, className, style }) => (
  <div className={`phone-mockup ${className || ""}`} style={style}>
    <div className="phone-notch" />
    <div className="phone-screen">{children}</div>
  </div>
);

// ==================== COUNTER ANIMATION ====================
const AnimatedCounter = ({ value, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ==================== NAVBAR ====================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <div className="logo-icon">
            <FaUtensils />
          </div>
          <span className="logo-text">Restroly</span>
        </a>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <a href="#" className="nav-link login-link">
            Log In
          </a>
          <motion.a
            href="#"
            className="btn btn-primary btn-nav"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.a>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#" className="btn btn-primary btn-mobile">
              Get Started Free
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <section ref={ref} className="hero-section">
      <ParticleField />
      <GradientOrb className="orb-1" />
      <GradientOrb className="orb-2" />

      <motion.div className="hero-content" style={{ y, opacity, scale }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="badge-dot" />
          <span>Trusted by 2,000+ Indian Restaurants</span>
          <FiArrowRight className="badge-arrow" />
        </motion.div>

        <div className="hero-title-wrapper">
          <TextReveal className="hero-title" delay={0.3}>
            Your Restaurant,
          </TextReveal>
          <TextReveal className="hero-title hero-title-gradient" delay={0.4}>
            Now Digital.
          </TextReveal>
          <TextReveal className="hero-title" delay={0.5}>
            Instantly.
          </TextReveal>
        </div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          From QR-based menus to contactless ordering, WhatsApp notifications,
          UPI payments & Zomato/Swiggy sync — all in one platform built for
          Indian restaurants.
        </motion.p>

        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.a
            href="#"
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 107, 53, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
            <FiArrowRight className="btn-icon" />
          </motion.a>
          <motion.a
            href="#"
            className="btn btn-ghost btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlay className="btn-icon-left" />
            Watch Demo
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {[
            { value: "2000", suffix: "+", label: "Restaurants" },
            { value: "500000", suffix: "+", label: "Orders Processed" },
            { value: "25", suffix: "+", label: "Languages" },
          ].map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="stat-value">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ y: phoneY, rotateZ: phoneRotate }}
        initial={{ opacity: 0, y: 60, rotateY: -15 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      >
        <div className="hero-phone-group">
          {/* Main Phone */}
          <PhoneMockup className="phone-main">
            <div className="screen-content menu-screen">
              <div className="screen-header">
                <div className="restaurant-logo-sm">🍛</div>
                <div>
                  <h4>Spice Garden</h4>
                  <span className="screen-sub">Pure Veg • North Indian</span>
                </div>
              </div>
              <div className="menu-categories">
                {["All", "Starters", "Main Course", "Breads", "Drinks"].map(
                  (cat, i) => (
                    <span
                      key={i}
                      className={`menu-cat ${i === 0 ? "active" : ""}`}
                    >
                      {cat}
                    </span>
                  )
                )}
              </div>
              <div className="menu-items">
                {[
                  {
                    name: "Paneer Butter Masala",
                    price: "₹249",
                    img: "🧈",
                    tag: "Bestseller",
                  },
                  {
                    name: "Dal Makhani",
                    price: "₹199",
                    img: "🫘",
                    tag: "Chef's Special",
                  },
                  {
                    name: "Butter Naan",
                    price: "₹49",
                    img: "🫓",
                    tag: "",
                  },
                  {
                    name: "Gulab Jamun",
                    price: "₹99",
                    img: "🍮",
                    tag: "Popular",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="menu-item-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                  >
                    <span className="item-emoji">{item.img}</span>
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      {item.tag && (
                        <span className="item-tag">{item.tag}</span>
                      )}
                    </div>
                    <div className="item-right">
                      <span className="item-price">{item.price}</span>
                      <button className="item-add">ADD</button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="cart-bar">
                <span>2 items | ₹448</span>
                <span className="cart-btn">View Cart →</span>
              </div>
            </div>
          </PhoneMockup>

          {/* Floating QR Card */}
          <motion.div
            className="floating-qr-card"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaQrcode className="qr-icon" />
            <span>Scan to Order</span>
          </motion.div>

          {/* Floating WhatsApp Notification */}
          <motion.div
            className="floating-notification"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1.5 },
              x: { delay: 1.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 },
            }}
          >
            <FaWhatsapp className="notif-icon whatsapp" />
            <div className="notif-content">
              <span className="notif-title">Order #1247 Confirmed!</span>
              <span className="notif-sub">
                Your order is being prepared 🍳
              </span>
            </div>
          </motion.div>

          {/* Floating UPI Card */}
          <motion.div
            className="floating-upi-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            transition={{
              opacity: { delay: 1.8 },
              x: { delay: 1.8 },
              y: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              },
            }}
          >
            <div className="upi-icon-wrap">
              <FaRupeeSign />
            </div>
            <div>
              <span className="upi-title">₹448 Paid</span>
              <span className="upi-sub">via UPI ✓</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <FiChevronDown />
      </motion.div>
    </section>
  );
};

// ==================== LOGO MARQUEE ====================
const LogoMarquee = () => {
  const logos = [
    "Zomato",
    "Swiggy",
    "Google Pay",
    "PhonePe",
    "Paytm",
    "WhatsApp Business",
    "Google Maps",
    "UPI",
  ];

  return (
    <section className="marquee-section">
      <p className="marquee-label">Seamlessly integrates with</p>
      <div className="marquee-track">
        <motion.div
          className="marquee-inner"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} className="marquee-item">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==================== 3D SCROLL FLOW SECTION ====================
const ScrollFlowSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,   // lower = slower response
    damping: 50,     // higher = smoother & slower
    restDelta: 0.001,

  });

  const steps = [
    {
      id: 1,
      icon: <FaQrcode />,
      title: "Scan QR Code",
      description:
        "Customer scans the QR code placed on the table. Instantly opens your digital menu — no app download needed.",
      color: "#FF6B35",
      emoji: "📱",
      screenContent: (
        <div className="flow-screen scan-screen">
          <motion.div className="scan-animation">
            <div className="scan-frame">
              <div className="scan-corner tl" />
              <div className="scan-corner tr" />
              <div className="scan-corner bl" />
              <div className="scan-corner br" />
              <motion.div
                className="scan-line"
                animate={{ y: [0, 140, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <FaQrcode className="scan-qr-big" />
            </div>
            <p className="scan-text">Point camera at QR code</p>
          </motion.div>
        </div>
      ),
    },
    {
      id: 2,
      icon: <FaUtensils />,
      title: "Browse & Order",
      description:
        "Beautiful digital menu with photos, descriptions in 25+ languages. Add items to cart with one tap.",
      color: "#10B981",
      emoji: "🍽️",
      screenContent: (
        <div className="flow-screen menu-flow-screen">
          <div className="flow-menu-header">
            <h4>🍛 Spice Garden</h4>
            <div className="lang-switch">
              <FaLanguage /> EN
            </div>
          </div>
          <div className="flow-categories">
            {["🔥 Popular", "🥗 Starters", "🍛 Main"].map((c, i) => (
              <span key={i} className={`flow-cat ${i === 0 ? "active" : ""}`}>
                {c}
              </span>
            ))}
          </div>
          {[
            { n: "Paneer Tikka", p: "₹199", e: "🧀" },
            { n: "Chicken Biryani", p: "₹299", e: "🍗" },
            { n: "Masala Dosa", p: "₹129", e: "🫓" },
          ].map((item, i) => (
            <div key={i} className="flow-menu-item">
              <span className="flow-item-emoji">{item.e}</span>
              <div className="flow-item-info">
                <span>{item.n}</span>
                <span className="flow-item-price">{item.p}</span>
              </div>
              <span className="flow-add-btn">+</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      icon: <FaRupeeSign />,
      title: "Pay via UPI",
      description:
        "Direct UPI payment links — Google Pay, PhonePe, Paytm. No commission, instant settlement.",
      color: "#6366F1",
      emoji: "💳",
      screenContent: (
        <div className="flow-screen payment-screen">
          <div className="payment-header">
            <h4>Payment</h4>
            <span className="payment-amount">₹627</span>
          </div>
          <div className="payment-summary">
            <div className="summary-row">
              <span>Paneer Tikka × 1</span>
              <span>₹199</span>
            </div>
            <div className="summary-row">
              <span>Chicken Biryani × 1</span>
              <span>₹299</span>
            </div>
            <div className="summary-row">
              <span>Masala Dosa × 1</span>
              <span>₹129</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹627</span>
            </div>
          </div>
          <div className="upi-options">
            {["GPay", "PhonePe", "Paytm", "UPI"].map((u, i) => (
              <div key={i} className={`upi-option ${i === 0 ? "selected" : ""}`}>
                {u}
              </div>
            ))}
          </div>
          <div className="pay-btn-flow">Pay ₹627 →</div>
        </div>
      ),
    },
    {
      id: 4,
      icon: <FaWhatsapp />,
      title: "WhatsApp Updates",
      description:
        "Real-time order notifications on WhatsApp — order confirmed, preparing, ready. Both for restaurant & customer.",
      color: "#25D366",
      emoji: "📲",
      screenContent: (
        <div className="flow-screen whatsapp-screen">
          <div className="wa-header">
            <FaWhatsapp className="wa-icon" />
            <div>
              <h4>Spice Garden</h4>
              <span className="wa-status">Online</span>
            </div>
          </div>
          <div className="wa-messages">
            {[
              {
                msg: "✅ Order #1247 Confirmed!\n\n🧀 Paneer Tikka × 1\n🍗 Chicken Biryani × 1\n🫓 Masala Dosa × 1\n\nTotal: ₹627",
                time: "2:30 PM",
              },
              {
                msg: "👨‍🍳 Your order is being prepared...",
                time: "2:32 PM",
              },
              {
                msg: "🔔 Your order is ready! Table #5",
                time: "2:45 PM",
              },
            ].map((m, i) => (
              <motion.div
                key={i}
                className="wa-message"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <p>{m.msg}</p>
                <span className="wa-time">{m.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 5,
      icon: <FiRefreshCw />,
      title: "Sync with Zomato & Swiggy",
      description:
        "Orders automatically sync with your Zomato and Swiggy dashboard. One menu, everywhere.",
      color: "#EF4444",
      emoji: "🔄",
      screenContent: (
        <div className="flow-screen sync-screen">
          <h4 className="sync-title">Order Synced!</h4>
          <div className="sync-platforms">
            <motion.div
              className="sync-card zomato-card"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="sync-logo">🔴</span>
              <span>Zomato</span>
              <span className="sync-status">✓ Synced</span>
            </motion.div>
            <motion.div
              className="sync-card swiggy-card"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <span className="sync-logo">🟠</span>
              <span>Swiggy</span>
              <span className="sync-status">✓ Synced</span>
            </motion.div>
          </div>
          <div className="sync-order-info">
            <span>Order #1247</span>
            <span className="sync-badge">Live on all platforms</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={containerRef} className="scroll-flow-section" id="how-it-works">
      <div className="flow-sticky-container">
        <div className="flow-left">
          <TextReveal className="section-label" delay={0}>
            How It Works
          </TextReveal>
          <TextReveal className="flow-title" delay={0.1}>
            From Scan to Serve
          </TextReveal>
          <TextReveal className="flow-title flow-title-gradient" delay={0.2}>
            in 60 Seconds
          </TextReveal>

          <div className="flow-steps">
            {steps.map((step, i) => {
              const stepStart = i / steps.length;
              const stepEnd = (i + 1) / steps.length;

              return (
                <FlowStep
                  key={step.id}
                  step={step}
                  index={i}
                  progress={smoothProgress}
                  stepStart={stepStart}
                  stepEnd={stepEnd}
                />
              );
            })}
          </div>
        </div>

        <div className="flow-right">
          <div className="flow-phone-container">
            <PhoneMockup className="phone-flow">
              {steps.map((step, i) => {
                const stepStart = i / steps.length;
                const stepEnd = (i + 1) / steps.length;

                return (
                  <FlowScreen
                    key={step.id}
                    step={step}
                    progress={smoothProgress}
                    stepStart={stepStart}
                    stepEnd={stepEnd}
                  />
                );
              })}
            </PhoneMockup>

            {/* Connection line from phone */}
            <motion.div
              className="flow-progress-ring"
              style={{
                background: `conic-gradient(#FF6B35 ${useTransform(
                  smoothProgress,
                  [0, 1],
                  [0, 360]
                )}deg, rgba(255,255,255,0.1) 0deg)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FlowStep = ({ step, index, progress, stepStart, stepEnd }) => {
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(progress, "change", (latest) => {
    setIsActive(latest >= stepStart && latest < stepEnd);
  });

  return (
    <motion.div
      className={`flow-step ${isActive ? "flow-step-active" : ""}`}
      animate={isActive ? { x: 10 } : { x: 0 }}
    >
      <div
        className="flow-step-number"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${step.color}, ${step.color}88)`
            : "rgba(255,255,255,0.05)",
          color: isActive ? "#fff" : "rgba(255,255,255,0.3)",
        }}
      >
        {step.icon}
      </div>
      <div className="flow-step-content">
        <h4>{step.title}</h4>
        <p>{step.description}</p>
      </div>
    </motion.div>
  );
};

const FlowScreen = ({ step, progress, stepStart, stepEnd }) => {
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(progress, "change", (latest) => {
    setIsActive(latest >= stepStart && latest < stepEnd);
  });

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="flow-screen-wrapper"
          initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: -30 }}
          transition={{ duration: 0.5 }}
        >
          {step.screenContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================== FEATURES SECTION ====================
const FeaturesSection = () => {
  const features = [
    {
      icon: <FaQrcode />,
      title: "QR-Based Digital Menu",
      description:
        "Generate unique QR codes for each table. Customers scan and browse your full menu instantly.",
      color: "#FF6B35",
      tag: "Core",
    },
    {
      icon: <FiSmartphone />,
      title: "Contactless Ordering",
      description:
        "Customers order directly from their phones. No waiter needed, no app download required.",
      color: "#10B981",
      tag: "Core",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp Notifications",
      description:
        "Order confirmations, status updates, and receipts delivered directly via WhatsApp.",
      color: "#25D366",
      tag: "Popular",
    },
    {
      icon: <FaRupeeSign />,
      title: "Direct UPI Payments",
      description:
        "Accept payments via Google Pay, PhonePe, Paytm — zero commission, instant settlement.",
      color: "#6366F1",
      tag: "New",
    },
    {
      icon: <FaLanguage />,
      title: "AI Translation (25+ Languages)",
      description:
        "Auto-translate your menu into Hindi, Tamil, Telugu, Bengali & 20+ more languages using AI.",
      color: "#F59E0B",
      tag: "AI Powered",
    },
    {
      icon: <FiRefreshCw />,
      title: "Zomato & Swiggy Sync",
      description:
        "Sync your menu and orders across Zomato, Swiggy, and your own website automatically.",
      color: "#EF4444",
      tag: "Integration",
    },
    {
      icon: <FiGlobe />,
      title: "Restaurant Website",
      description:
        "Beautiful, responsive website for your restaurant with online ordering, reviews, and SEO.",
      color: "#8B5CF6",
      tag: "Included",
    },
    {
      icon: <FiTrendingUp />,
      title: "Analytics Dashboard",
      description:
        "Track orders, revenue, popular items, peak hours, and customer behavior in real-time.",
      color: "#06B6D4",
      tag: "Insights",
    },
    {
      icon: <FiShield />,
      title: "FSSAI Compliant",
      description:
        "Display your FSSAI license, nutritional info, allergen warnings — fully compliant menus.",
      color: "#84CC16",
      tag: "Compliance",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <RevealSection>
            <span className="section-label">Features</span>
          </RevealSection>
          <TextReveal className="section-title">
            Everything Your Restaurant
          </TextReveal>
          <TextReveal className="section-title section-title-gradient" delay={0.1}>
            Needs to Go Digital
          </TextReveal>
          <RevealSection delay={0.2}>
            <p className="section-description">
              From street-side dhabas to fine dining — one platform for all your digital needs.
            </p>
          </RevealSection>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <TiltCard className="feature-card">
                <div className="feature-card-inner" style={{ "--accent": feature.color }}>
                  <div className="feature-tag">{feature.tag}</div>
                  <div
                    className="feature-icon"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <a href="#" className="feature-link" style={{ color: feature.color }}>
                    Learn more <FiArrowRight />
                  </a>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== RESTAURANT TYPES ====================
const RestaurantTypes = () => {
  const types = [
    { emoji: "🏪", name: "Street Food & Dhabas", desc: "Simple QR menus, fast ordering" },
    { emoji: "🍕", name: "Cafés & QSR", desc: "Self-service ordering system" },
    { emoji: "🍽️", name: "Casual Dining", desc: "Table-wise QR, full menu management" },
    { emoji: "🥂", name: "Fine Dining", desc: "Premium digital experience" },
    { emoji: "☁️", name: "Cloud Kitchens", desc: "Multi-brand menu management" },
    { emoji: "🍰", name: "Bakeries & Desserts", desc: "Visual menus with photos" },
  ];

  return (
    <section className="restaurant-types-section">
      <div className="container">
        <div className="section-header">
          <RevealSection>
            <span className="section-label">For Every Restaurant</span>
          </RevealSection>
          <TextReveal className="section-title">Built for India's</TextReveal>
          <TextReveal className="section-title section-title-gradient" delay={0.1}>
            Diverse Food Culture
          </TextReveal>
        </div>

        <div className="types-grid">
          {types.map((type, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <motion.div
                className="type-card"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="type-emoji">{type.emoji}</span>
                <h3>{type.name}</h3>
                <p>{type.desc}</p>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== PRICING SECTION ====================
const PricingSection = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small restaurants & dhabas",
      price: annual ? "₹0" : "₹0",
      period: "forever",
      features: [
        "Digital Menu with QR Code",
        "Up to 50 Menu Items",
        "Basic Website",
        "WhatsApp Notifications",
        "UPI Payment Links",
      ],
      cta: "Start Free",
      popular: false,
      color: "#64748B",
    },
    {
      name: "Growth",
      description: "For growing restaurants & cafés",
      price: annual ? "₹999" : "₹1,299",
      period: "/month",
      features: [
        "Everything in Starter",
        "Unlimited Menu Items",
        "AI Translation (25+ languages)",
        "Zomato & Swiggy Sync",
        "Analytics Dashboard",
        "Custom Domain",
        "Priority Support",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "#FF6B35",
    },
    {
      name: "Enterprise",
      description: "For chains & multi-outlet brands",
      price: "Custom",
      period: "",
      features: [
        "Everything in Growth",
        "Multi-location Management",
        "Dedicated Account Manager",
        "Custom Integrations",
        "White-label Solution",
        "SLA Guarantee",
        "API Access",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "#8B5CF6",
    },
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <RevealSection>
            <span className="section-label">Pricing</span>
          </RevealSection>
          <TextReveal className="section-title">Simple, Transparent</TextReveal>
          <TextReveal className="section-title section-title-gradient" delay={0.1}>
            Pricing for All
          </TextReveal>
          <RevealSection delay={0.2}>
            <p className="section-description">
              Start free, upgrade when you grow. No hidden charges.
            </p>
          </RevealSection>

          <RevealSection delay={0.3}>
            <div className="pricing-toggle">
              <span className={!annual ? "toggle-active" : ""}>Monthly</span>
              <button
                className={`toggle-btn ${annual ? "toggle-on" : ""}`}
                onClick={() => setAnnual(!annual)}
              >
                <motion.div className="toggle-thumb" layout />
              </button>
              <span className={annual ? "toggle-active" : ""}>
                Annual <span className="save-badge">Save 20%</span>
              </span>
            </div>
          </RevealSection>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <RevealSection key={i} delay={i * 0.15}>
              <TiltCard
                className={`pricing-card ${plan.popular ? "pricing-popular" : ""}`}
              >
                <div className="pricing-card-inner">
                  {plan.popular && (
                    <div className="popular-badge">Most Popular 🔥</div>
                  )}
                  <div className="pricing-header">
                    <h3 style={{ color: plan.color }}>{plan.name}</h3>
                    <p>{plan.description}</p>
                  </div>
                  <div className="pricing-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">{plan.period}</span>
                  </div>
                  <ul className="pricing-features">
                    {plan.features.map((f, j) => (
                      <li key={j}>
                        <FiCheck className="check-icon" style={{ color: plan.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className={`btn ${plan.popular ? "btn-primary" : "btn-outline"} btn-full`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== TESTIMONIALS ====================
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Owner, Shree Krishna Dhaba",
      location: "Jaipur, Rajasthan",
      image: "👨‍🍳",
      text: "Restroly transformed our small dhaba! Customers love scanning QR and ordering. Our order accuracy improved by 90%. The WhatsApp notifications are a game-changer.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Manager, The Urban Café",
      location: "Bangalore, Karnataka",
      image: "👩‍💼",
      text: "The Zomato and Swiggy sync saved us hours of manual work. We manage everything from one dashboard. AI translation helped us serve tourists in their language!",
      rating: 5,
    },
    {
      name: "Mohammed Ali",
      role: "Owner, Biryani House",
      location: "Hyderabad, Telangana",
      image: "👨‍🍳",
      text: "UPI payments directly to our account with zero commission? That alone saved us ₹30,000/month! Setup took just 15 minutes. Highly recommend for any restaurant.",
      rating: 5,
    },
    {
      name: "Anita Patel",
      role: "Owner, Sweet Treats Bakery",
      location: "Ahmedabad, Gujarat",
      image: "👩‍🍳",
      text: "Our bakery website looks stunning and the digital menu with photos increased our average order value by 35%. Customers can now see exactly what they're ordering.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <RevealSection>
            <span className="section-label">Testimonials</span>
          </RevealSection>
          <TextReveal className="section-title">
            Loved by Restaurants
          </TextReveal>
          <TextReveal className="section-title section-title-gradient" delay={0.1}>
            Across India
          </TextReveal>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <RevealSection key={i} delay={i * 0.15}>
              <TiltCard className="testimonial-card">
                <div className="testimonial-inner">
                  <div className="testimonial-stars">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar key={j} className="star-icon" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <span className="author-avatar">{t.image}</span>
                    <div className="author-info">
                      <span className="author-name">{t.name}</span>
                      <span className="author-role">{t.role}</span>
                      <span className="author-location">
                        <FiMapPin /> {t.location}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== CTA SECTION ====================
const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-bg">
        <GradientOrb className="orb-cta-1" />
        <GradientOrb className="orb-cta-2" />
      </div>
      <div className="container">
        <RevealSection className="cta-content">
          <TextReveal className="cta-title">
            Ready to Digitize
          </TextReveal>
          <TextReveal className="cta-title cta-title-gradient" delay={0.1}>
            Your Restaurant?
          </TextReveal>
          <motion.p
            className="cta-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Join 2,000+ restaurants already using Restroly. Set up in under 15
            minutes. No credit card required.
          </motion.p>
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#"
              className="btn btn-white btn-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
              <FiArrowRight className="btn-icon" />
            </motion.a>
            <motion.a
              href="#"
              className="btn btn-ghost-white btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="btn-icon-left" />
              Chat on WhatsApp
            </motion.a>
          </motion.div>
          <div className="cta-trust">
            <span>✓ Free forever plan</span>
            <span>✓ No credit card needed</span>
            <span>✓ Setup in 15 minutes</span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

// ==================== FOOTER ====================
const Footer = () => {
  const footerLinks = {
    Product: [
      "Digital Menu",
      "QR Ordering",
      "Restaurant Website",
      "Payment Links",
      "Analytics",
    ],
    Integrations: [
      "Zomato Sync",
      "Swiggy Sync",
      "WhatsApp Business",
      "Google Maps",
      "UPI Payments",
    ],
    Resources: ["Blog", "Help Center", "API Docs", "Case Studies", "Webinars"],
    Company: ["About Us", "Careers", "Contact", "Press", "Partners"],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <div className="logo-icon">
                <FaUtensils />
              </div>
              <span className="logo-text">Restroly</span>
            </a>
            <p className="footer-tagline">
              India's all-in-one digital solution for restaurants. From
              street-side dhabas to fine dining.
            </p>
            <div className="footer-socials">
              {[FaInstagram, FaTwitter, FaLinkedin, FaYoutube].map(
                (Icon, i) => (
                  <a key={i} href="#" className="social-link">
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-column">
              <h4>{category}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2025 Restroly. All rights reserved. Made with ❤️ in India.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== MAIN LANDING PAGE ====================
const Landing = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#0A0A0F";
    document.body.style.color = "#ffffff";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <ScrollFlowSection />
      <FeaturesSection />
      <RestaurantTypes />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;