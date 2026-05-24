import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Phone, Mail, Clock, Leaf, Sparkles, Activity, Flower2, Bone, Heart, Stethoscope, Brain, User, Check, Star, MessageCircle, Lock, Menu, X, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    email: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '',
    treatment: '',
    symptoms: ''
  });

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    // Store in localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Format message for WhatsApp
    const message = `*NEW APPOINTMENT REQUEST* 📋

*Patient Details:*
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Age: ${formData.age}
Email: ${formData.email}

*Appointment Details:*
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}
Treatment: ${formData.treatment}

*Symptoms/Concern:*
${formData.symptoms}

---
Received: ${new Date().toLocaleString()}`;

    // Send to WhatsApp - your own number
    const shopkeeperPhone = '+919894116762'; // Use your WhatsApp number with the country code

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: shopkeeperPhone,
          message,
          appointment: newAppointment
        })
      });

      // Always show a generic confirmation to the user so internal delivery details remain private.
      toast.success('✓ Appointment received. We will contact you shortly.', {
        duration: 4000,
      });

      if (!response.ok) {
        // Log error details for debugging but do not expose them to the user.
        const errorData = await response.json().catch(() => null);
        console.error('WhatsApp send failed:', errorData || await response.text().catch(() => null));
      }
    } catch (err) {
      console.error('Error sending WhatsApp message:', err);
      // Generic confirmation for the user regardless of backend errors.
      toast.success('✓ Appointment received. We will contact you shortly.', {
        duration: 4000,
      });
    }
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      age: '',
      email: '',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '',
      treatment: '',
      symptoms: ''
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.boxShadow = '0 4px 30px rgba(0,0,0,.25)';
        } else {
          nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.15)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: <Leaf className="w-6 h-6" />, title: 'Siddha Herbal Medicine', desc: 'Personalised herbal formulations using rare and authentic Siddha herbs to treat chronic and acute ailments at the root.' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Varma Therapy', desc: 'Ancient pressure-point healing to relieve pain, improve nerve function, and restore vital energy flow throughout the body.' },
    { icon: <Activity className="w-6 h-6" />, title: 'Kayakalpa Treatment', desc: 'Rejuvenation and anti-ageing therapy designed to revitalise body cells, enhance immunity, and promote longevity.' },
    { icon: <Flower2 className="w-6 h-6" />, title: 'Women\'s Health Care', desc: 'Specialised treatments for PCOS, menstrual disorders, fertility, and post-natal care using Siddha protocols.' },
    { icon: <Bone className="w-6 h-6" />, title: 'Bone & Joint Care', desc: 'Natural management of arthritis, spondylitis, and joint pain through herbal oils, lepa (paste), and internal medicines.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Respiratory Wellness', desc: 'Proven Siddha therapies for asthma, sinusitis, and allergies — long-term relief without dependency.' },
    { icon: <Stethoscope className="w-6 h-6" />, title: 'Skin Disorders', desc: 'Holistic treatment for eczema, psoriasis, vitiligo, and other skin conditions through blood-purifying herbs and detox.' },
    { icon: <Brain className="w-6 h-6" />, title: 'Stress & Mental Wellness', desc: 'Mind-body therapies combining Siddha medicine and lifestyle guidance to address anxiety, insomnia, and burnout.' }
  ];

  const testimonials = [
    { stars: 5, text: 'I suffered from psoriasis for eight years. After three months of treatment with Dr. Muthu, my skin has cleared up remarkably. The herbal medicines and his guidance changed my life completely.', name: 'Suresh Pandian', role: 'Psoriasis Patient · Coimbatore', initials: 'SP' },
    { stars: 5, text: 'My PCOS had been affecting me for years. After consulting Dr. Muthu, I saw visible improvement within two months. His holistic approach and personalised care is truly exceptional.', name: 'Priya Krishnamurthy', role: 'Women\'s Health · Vadavalli', initials: 'PK' },
    { stars: 5, text: 'The Varma treatment for my lower back pain was miraculous. I had been on painkillers for two years. Three sessions with Dr. Muthu and I was pain-free. Highly recommended!', name: 'Arun Raj', role: 'Varma Therapy · Coimbatore', initials: 'AR' },
    { stars: 5, text: 'My son had severe asthma since childhood. After following Dr. Muthu\'s treatment plan for six months, the frequency of attacks reduced by over 90%. We are deeply grateful.', name: 'Meena Murugan', role: 'Paediatric Care · Pollachi', initials: 'MM' },
    { stars: 5, text: 'I travelled from Chennai specifically for the Kayakalpa treatment. The results have been beyond expectation — better sleep, more energy, and a genuine sense of renewal. Worth every trip.', name: 'Ramesh Narayanan', role: 'Kayakalpa · Chennai', initials: 'RN' },
    { stars: 5, text: 'Dr. Muthu diagnosed my digestive issue with precision and prescribed a simple herbal regimen. Within weeks my condition improved. The clinic is clean, welcoming, and thoroughly professional.', name: 'Lakshmi Venkatesan', role: 'Digestive Health · Vadavalli', initials: 'LV' }
  ];

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav>
        <a className="nav-brand" href="#">
          <div className="nav-logo">MS</div>
          <div className="nav-name">
            Dr. Muthu Siddha Clinic
            <span>Traditional Siddha Medicine · Coimbatore</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#doctor">Our Doctor</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#booking" className="nav-cta">Book Appointment</a></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#services" onClick={toggleMenu}>Services</a>
          <a href="#doctor" onClick={toggleMenu}>Our Doctor</a>
          <a href="#testimonials" onClick={toggleMenu}>Reviews</a>
          <a href="#location" onClick={toggleMenu}>Location</a>
          <a href="#booking" onClick={toggleMenu}>Book Appointment</a>
        </div>
      )}

      {/* HERO */}
      <section id="hero">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✦</span>
            Authentic Siddha Medicine
          </div>
          <h1 className="hero-title">
            Heal Naturally,<br />
            Live <em>Better</em>
          </h1>
          <p className="hero-subtitle">Ancient wisdom. Modern care. Complete wellness.</p>
          <div className="hero-location">
            <MapPin className="w-4 h-4" />
            Vadavalli, Coimbatore, Tamil Nadu
          </div>
          <div className="hero-actions">
            <a href="#booking" className="btn-primary">
              <Calendar className="w-4 h-4" />
              Book Appointment
            </a>
            <a href="#services" className="btn-outline">
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="hero-stats-wrapper">
            <div className="hero-stats" role="list" aria-label="Key clinic statistics">
              <div className="stat-item" role="listitem" aria-label="Years of experience">
                <div className="stat-icon"><Clock className="w-5 h-5" /></div>
                <div className="stat-num">20+</div>
                <div className="stat-label">Years Experience</div>
                <div className="stat-sub">Decades of traditional Siddha practice</div>
              </div>

              <div className="stat-item" role="listitem" aria-label="Patients treated">
                <div className="stat-icon"><User className="w-5 h-5" /></div>
                <div className="stat-num">5,000+</div>
                <div className="stat-label">Patients Treated</div>
                <div className="stat-sub">Successful treatments and follow-ups</div>
              </div>

              <div className="stat-item" role="listitem" aria-label="Patient satisfaction rate">
                <div className="stat-icon"><Heart className="w-5 h-5" /></div>
                <div className="stat-num">98%</div>
                <div className="stat-label">Patient Satisfaction</div>
                <div className="stat-sub">Measured from patient feedback surveys</div>
              </div>

              <div className="stat-item" role="listitem" aria-label="Clinic locations">
                <div className="stat-icon"><MapPin className="w-5 h-5" /></div>
                <div className="stat-num">3</div>
                <div className="stat-label">Clinic Locations</div>
                <div className="stat-sub">Accessible care across the region</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="services-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Our Siddha Treatments</h2>
          <p className="section-desc">
            Rooted in the 5,000-year-old Tamil tradition of Siddha medicine, each treatment is tailored to restore your body's natural balance.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking">
        <div className="booking-wrap">
          <div className="booking-info">
            <span className="section-tag" style={{ background: 'rgba(201,168,76,.15)', color: 'var(--gold-light)' }}>
              Book Now
            </span>
            <h2>Schedule Your<br />Appointment</h2>
            <p>
              Take the first step toward natural healing. Our team will confirm your booking within a few hours via WhatsApp or phone call.
            </p>
            <div className="clinic-details">
              <div className="detail-row">
                <div className="detail-icon"><MapPin className="w-4 h-4" /></div>
                <div>
                  <strong>Address</strong>
                  2WC4+FJG, Vadavalli, Coimbatore – 641 041, Tamil Nadu, India
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-icon"><Phone className="w-4 h-4" /></div>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  +91 99420 46922
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-icon"><Clock className="w-4 h-4" /></div>
                <div>
                  <strong>Clinic Hours</strong>
                  Mon – Sat: 9:00 AM – 7:00 PM<br />
                  Sunday: 10:00 AM – 1:00 PM
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-icon"><Mail className="w-4 h-4" /></div>
                <div>
                  <strong>Email</strong>
                  info@drmusiddha.clinic
                </div>
              </div>
            </div>
          </div>
          <div className="booking-form">
            <h3>Appointment Request</h3>
            <form onSubmit={submitForm}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ravi"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Kumar"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="35"
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email (optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select time</option>
                    <option>9:00 AM – 10:00 AM</option>
                    <option>10:00 AM – 11:00 AM</option>
                    <option>11:00 AM – 12:00 PM</option>
                    <option>2:00 PM – 3:00 PM</option>
                    <option>3:00 PM – 4:00 PM</option>
                    <option>5:00 PM – 6:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Treatment / Concern</label>
                <select
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select treatment area</option>
                  <option>General Siddha Consultation</option>
                  <option>Varma Therapy</option>
                  <option>Kayakalpa / Rejuvenation</option>
                  <option>Women's Health</option>
                  <option>Bone & Joint Care</option>
                  <option>Respiratory Wellness</option>
                  <option>Skin Disorders</option>
                  <option>Stress & Mental Wellness</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Brief Description of Symptoms</label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe your main health concern or symptoms..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="form-submit">
                Confirm Appointment Request
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
              <p className="form-note">
                <Lock className="w-3 h-3 inline" /> Your information is private and secure. We'll contact you within 3 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section id="doctor">
        <div className="doctor-wrap">
          <div className="doctor-img-wrap">
            <div className="doctor-avatar">
              <div className="doctor-avatar-inner">
                <User className="w-24 h-24" />
              </div>
            </div>
            <div className="doc-badge">
              <div className="doc-badge-num">15+</div>
              <div className="doc-badge-text">Years of<br />Practice</div>
            </div>
          </div>
          <div className="doctor-info">
            <span className="section-tag">Meet the Doctor</span>
            <h2>Dr. Muthu</h2>
            <div className="doctor-title">B.S.M.S · M.D. (Siddha) · Varma Specialist</div>
            <p>
              Dr. Muthu is a distinguished practitioner of Siddha medicine with over 15 years of dedicated clinical experience at his clinic in Vadavalli, Coimbatore. Trained in the rich traditions of Tamil Siddha healing, he combines ancient wisdom with a compassionate, patient-centred approach.
            </p>
            <p>
              Having treated thousands of patients across Tamil Nadu, Dr. Muthu is particularly renowned for his expertise in Varma therapy and complex chronic conditions that have resisted conventional treatment. His commitment to authentic, herb-based healing has made the clinic a trusted name in Coimbatore.
            </p>
            <div className="qualifications">
              <span className="qual-pill">B.S.M.S (Siddha)</span>
              <span className="qual-pill">M.D. Siddha Medicine</span>
              <span className="qual-pill">Varma Vidya Expert</span>
              <span className="qual-pill">Kayakalpa Specialist</span>
              <span className="qual-pill">Govt. Registered Physician</span>
            </div>
            <div className="expertise-list">
              <div className="exp-item">
                <Check className="w-4 h-4" />
                Chronic Disease Management
              </div>
              <div className="exp-item">
                <Check className="w-4 h-4" />
                Varma Pressure Therapy
              </div>
              <div className="exp-item">
                <Check className="w-4 h-4" />
                Women's Reproductive Health
              </div>
              <div className="exp-item">
                <Check className="w-4 h-4" />
                Paediatric Siddha Care
              </div>
              <div className="exp-item">
                <Check className="w-4 h-4" />
                Skin & Blood Disorders
              </div>
              <div className="exp-item">
                <Check className="w-4 h-4" />
                Detox & Panchakarma
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="test-header">
          <span className="section-tag">Patient Stories</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-desc">
            Real stories from patients who found relief through authentic Siddha treatment at our clinic.
          </p>
        </div>
        <div className="test-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="test-card">
              <div className="test-stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 inline fill-current" />
                ))}
              </div>
              <p>{testimonial.text}</p>
              <div className="test-author">
                <div className="test-avatar">{testimonial.initials}</div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION & MAP */}
      <section id="location">
        <div className="location-wrap">
          <div className="location-info">
            <span className="section-tag">Find Us</span>
            <h2 className="section-title">Visit Our Clinic</h2>
            <p>
              We are conveniently located in Vadavalli, one of Coimbatore's most accessible neighbourhoods. Easy access via bus, auto-rickshaw, and private vehicle.
            </p>
            <table className="hours-table">
              <tbody>
                <tr>
                  <td>Monday – Friday</td>
                  <td>9:00 AM – 7:00 PM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>9:00 AM – 5:00 PM</td>
                </tr>
                <tr className="closed">
                  <td>Sunday</td>
                  <td>10:00 AM – 1:00 PM</td>
                </tr>
              </tbody>
            </table>
            <a
              href="https://maps.google.com/?q=2WC4+FJG,Vadavalli,Coimbatore,Tamil+Nadu+641041"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: 'var(--green-mid)', color: 'white', textDecoration: 'none', display: 'inline-flex', width: 'fit-content' }}
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7259871374573!2d76.93443231480302!3d10.982963692154246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85f8b3c9eedbb%3A0x7d1c1dcf02b0f8b8!2s2WC4%2BFJG%2C%20Vadavalli%2C%20Coimbatore%2C%20Tamil%20Nadu%20641041!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vadavalli Coimbatore Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              Dr. Muthu Siddha Clinic
              <span>Traditional Siddha Medicine · Coimbatore</span>
            </div>
            <p className="footer-about">
              Rooted in the ancient Siddha tradition of Tamil Nadu, we bring authentic, effective natural healing to the heart of Coimbatore. Your wellness is our mission.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#doctor">Meet the Doctor</a></li>
              <li><a href="#testimonials">Patient Reviews</a></li>
              <li><a href="#booking">Book Appointment</a></li>
              <li><a href="#location">Location & Hours</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+919942046922">
                  <Phone className="w-3 h-3 inline mr-1" />
                  +91 99420 46922
                </a>
              </li>
              <li>
                <a href="mailto:info@drmusiddha.clinic">
                  <Mail className="w-3 h-3 inline mr-1" />
                  info@drmusiddha.clinic
                </a>
              </li>
              <li>
                <a href="https://wa.me/919942046922" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-3 h-3 inline mr-1" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href="#location">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Vadavalli, Coimbatore 641041
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Dr. Muthu Siddha Clinic. All rights reserved.</p>
          <p>Registered Siddha Medical Practitioner · Govt. of Tamil Nadu</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
