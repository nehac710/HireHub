import React, { useState } from 'react';
import '../styles/JobListing.css';

const JobListing = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    experience: 'All',
    search: ''
  });

  // Sample job data - in a real app, this would come from your backend
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Solutions Inc.',
      description: 'We are looking for an experienced React developer to join our team. The ideal candidate should have strong experience with React, Node.js, and modern web development practices. You will be responsible for developing and maintaining our web applications, implementing new features, and ensuring high performance and responsiveness.',
      requirements: [
        '5+ years of experience with React and JavaScript',
        'Strong understanding of state management (Redux/Context)',
        'Experience with RESTful APIs and GraphQL',
        'Knowledge of modern build tools and CI/CD pipelines',
        'Excellent problem-solving skills'
      ],
      budget: 5000,
      duration: '3 months',
      category: 'Web Development',
      experience: 'Expert',
      skills: ['React', 'Node.js', 'TypeScript', 'Redux', 'GraphQL'],
      posted: '2 days ago',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      description: 'We need a creative UI/UX designer to help us create beautiful and intuitive user interfaces. The ideal candidate should have a strong portfolio demonstrating their design skills and experience with modern design tools. You will work closely with our development team to create user-centered designs that meet business requirements.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong understanding of user-centered design principles',
        'Experience with design systems and component libraries',
        'Excellent communication and collaboration skills'
      ],
      budget: 3000,
      duration: '2 months',
      category: 'Design',
      experience: 'Intermediate',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
      posted: '1 day ago',
      location: 'Remote',
      type: 'Contract'
    },
    {
      id: 3,
      title: 'Content Writer',
      company: 'Digital Marketing Agency',
      description: 'We are seeking a skilled content writer to create engaging and SEO-optimized content for our clients. The ideal candidate should have experience writing for various industries and be able to adapt their writing style to different audiences. You will be responsible for creating blog posts, website content, and marketing materials.',
      requirements: [
        '2+ years of content writing experience',
        'Strong research and writing skills',
        'Knowledge of SEO best practices',
        'Ability to meet deadlines',
        'Experience with content management systems'
      ],
      budget: 1500,
      duration: '1 month',
      category: 'Writing',
      experience: 'Entry Level',
      skills: ['Content Writing', 'SEO', 'Blogging', 'Copywriting', 'Research'],
      posted: '5 hours ago',
      location: 'Remote',
      type: 'Part-time'
    }
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = (jobId) => {
    // Here you would typically handle the application process
    console.log('Applying for job:', jobId);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = filters.category === 'All' || job.category === filters.category;
    const matchesExperience = filters.experience === 'All' || job.experience === filters.experience;
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesExperience && matchesSearch;
  });

  return (
    <div className="job-listing-container">
      <div className="job-listing-header">
        <h1>Available Jobs</h1>
        <div className="filters">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search jobs..."
            className="search-input"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="All">All Experience Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      <div className="job-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h2>{job.title}</h2>
              <span className="company">{job.company}</span>
            </div>
            
            <div className="job-meta">
              <span className="job-type">{job.type}</span>
              <span className="job-location">{job.location}</span>
            </div>

            <div className="job-description">
              <h3>Description</h3>
              <p>{job.description}</p>
            </div>

            <div className="job-requirements">
              <h3>Requirements</h3>
              <ul>
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <div className="job-details">
              <div className="detail">
                <span className="label">Budget:</span>
                <span className="value">${job.budget}</span>
              </div>
              <div className="detail">
                <span className="label">Duration:</span>
                <span className="value">{job.duration}</span>
              </div>
              <div className="detail">
                <span className="label">Category:</span>
                <span className="value">{job.category}</span>
              </div>
              <div className="detail">
                <span className="label">Experience:</span>
                <span className="value">{job.experience}</span>
              </div>
            </div>

            <div className="skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>

            <div className="job-footer">
              <span className="posted-time">Posted {job.posted}</span>
              <button 
                className="btn btn-primary"
                onClick={() => handleApply(job.id)}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing; 