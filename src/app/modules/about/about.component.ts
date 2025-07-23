import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Omar',
      role: 'Founder & CEO',
      bio: 'Passionate perfume enthusiast with over 100 years of experience in the fragrance industry.',
      image: 'assets/team/omar.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/omar-sagga',
        facebook: 'https://www.facebook.com/omar.sagga.2025',
        email: 'medomarsaggaomar@gmail.com'
      }
    }
  ];

  companyStats = [
    { number: '500+', label: 'Perfumes Cataloged' },
    { number: '10+', label: 'Premium Brands' },
    { number: '5', label: 'Years Experience' },
    { number: '1000+', label: 'Happy Customers' }
  ];

  features = [
    {
      icon: 'fas fa-vial',
      title: 'Premium Collection',
      description: 'Curated selection of the finest perfumes from renowned brands worldwide.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Quality Assured',
      description: 'Every perfume is authenticated and quality-checked before being added to our collection.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Passion Driven',
      description: 'Built by perfume lovers, for perfume lovers. We understand the art of fragrance.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Focused',
      description: 'Join a community of fragrance enthusiasts and share your passion for perfumes.'
    }
  ];

  constructor() { }

}