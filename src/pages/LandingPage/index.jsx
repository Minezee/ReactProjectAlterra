import React from 'react'
import './landingPage.css'
import images from '../../assets/image.svg'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <main>
        <section id="hero">
          <div className="text-wrapper">
            <h1>Better Solutions For Your Business</h1>
            <p>We are team of talented designers making websites with Bootstrap</p>
            <div className="btn-wrapper">
              <Link to="./create-product" className="start-btn">Get Started</Link>
              <Link to="" className="watch-btn">Watch Video</Link>
            </div>
          </div>
          <img src={images} alt="images" className="hero-img" />
        </section>
        <section className="subs-section">
          <div className="subs-container">
            <h2>Join Our Newsletter</h2>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
            <form className="input-container">
              <input type="text" className="subs-input" />
              <button type="submit" className="subs-btn">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <div className="ftr-list">
          <div className="ftr-info">
            <h2>ARSHA</h2>
            <span>A108 Adam Street</span>
            <span>New York, NY 535022</span>
            <span> United States</span>
            <div className="detail-info">
              <div><span className="detail-ttl">Phone:</span> +1 5589 55488 55</div>
              <div><span className="detail-ttl">Email:</span> info@example.com</div>
            </div>
          </div>
          <div className="list-container">
            <h3>Useful Links</h3>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Services</li>
              <li>Terms of services</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="list-container">
            <h3>Our Services</h3>
            <ul>
              <li>Web Design</li>
              <li>Web Development</li>
              <li>Product Management</li>
              <li>Marketing</li>
              <li>Graphic Design</li>
            </ul>
          </div>
          <div className="social-container">
            <h3>Our Social Networks</h3>
            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
            <div className="media-container">
              <div className="social"></div>
              <div className="social"></div>
              <div className="social"></div>
              <div className="social"></div>
              <div className="social"></div>
            </div>
          </div>
        </div>
        <div className="copy-right">
          <span>© Copyright Arsha. All Rights Reserved</span>
          <span>Designed by <Link to="" className="bstrp-link">BootstrapMade</Link></span>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage