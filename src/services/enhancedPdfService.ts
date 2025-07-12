import html2pdf from 'html2pdf.js';
import { ResumeData, AIEnhancedContent } from '../types/resume';

export const enhancedPdfService = {
  async generatePDF(resumeData: ResumeData, aiEnhancedContent: AIEnhancedContent | null, templateId: string = 'modern-glass'): Promise<void> {
    const element = document.createElement('div');
    element.innerHTML = this.generateAshishTemplateHTML(resumeData, aiEnhancedContent);
    
    const opt = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_professional.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 3,
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        compress: true
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  },

  generateAshishTemplateHTML(resumeData: ResumeData, aiEnhancedContent: AIEnhancedContent | null): string {
    return this.generateAshishTemplate(resumeData, displayContent);
  },

  generateAshishTemplate(resumeData: ResumeData, displayContent: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${resumeData.personalInfo.fullName} - Professional Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Calibri', 'Arial', sans-serif; 
          line-height: 1.6; 
          color: #333333; 
          font-size: 11px;
          background: white;
        }
        
        .container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
          background: white;
        }
        
        .header { 
          text-align: center;
          border-bottom: 2px solid #2c5aa0;
          padding-bottom: 20px; 
          margin-bottom: 25px;
        }
        
        .name { 
          font-size: 24px; 
          font-weight: bold; 
          color: #2c5aa0; 
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .contact { 
          display: flex; 
          justify-content: center;
          flex-wrap: wrap; 
          gap: 15px; 
          font-size: 10px; 
          color: #666;
        }
        
        .contact-item { 
          display: flex; 
          align-items: center; 
          gap: 5px;
        }
        
        .contact-item a {
          color: #2c5aa0;
          text-decoration: none;
        }
        
        .section { 
          margin-bottom: 20px; 
          page-break-inside: avoid;
        }
        
        .section-title { 
          font-size: 14px; 
          font-weight: bold; 
          color: #2c5aa0; 
          margin-bottom: 15px; 
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-bottom: 1px solid #2c5aa0;
          padding-bottom: 5px;
        }
        
        .experience-item, .project-item, .education-item, .cert-item { 
          margin-bottom: 15px; 
          padding-bottom: 10px;
          border-bottom: 1px solid #e0e0e0;
          page-break-inside: avoid;
        }
        
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          margin-bottom: 8px; 
        }
        
        .item-title { 
          font-weight: bold; 
          color: #333; 
          font-size: 13px;
        }
        
        .item-company { 
          color: #2c5aa0;
          font-weight: 600; 
          font-size: 11px;
        }
        
        .item-duration { 
          color: #666; 
          font-size: 10px;
          text-align: right;
          white-space: nowrap;
          font-style: italic;
        }
        
        .item-description { 
          color: #555; 
          font-size: 10px; 
          line-height: 1.5;
          text-align: justify;
          margin-top: 5px;
        }
        
        .skills-grid { 
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        
        .skill-tag { 
          background: #f0f0f0; 
          color: #333; 
          padding: 5px 10px; 
          border-radius: 5px; 
          font-size: 9px;
          font-weight: 500;
          text-align: center;
        }
        
        .tech-tags { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 5px; 
          margin-top: 8px; 
        }
        
        .tech-tag { 
          background: #e8f4f8; 
          color: #2c5aa0; 
          padding: 3px 8px; 
          border-radius: 5px; 
          font-size: 8px;
          font-weight: 500;
        }
        
        .summary-text {
          font-size: 11px;
          line-height: 1.6;
          color: #555;
          text-align: justify;
          margin-bottom: 15px;
        }
        
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media print {
          body { 
            font-size: 10px;
            print-color-adjust: exact;
          }
          .container {
            padding: 0.3in;
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${resumeData.personalInfo.fullName}</div>
          <div class="contact">
            ${resumeData.personalInfo.email ? `<div class="contact-item"><a href="mailto:${resumeData.personalInfo.email}">${resumeData.personalInfo.email}</a></div>` : ''}
            ${resumeData.personalInfo.phone ? `<div class="contact-item">${resumeData.personalInfo.phone}</div>` : ''}
            ${resumeData.personalInfo.location ? `<div class="contact-item">${resumeData.personalInfo.location}</div>` : ''}
          </div>
          <div class="contact">
            ${resumeData.personalInfo.linkedIn ? `<div class="contact-item"><a href="${resumeData.personalInfo.linkedIn}">LinkedIn Profile</a></div>` : ''}
            ${resumeData.personalInfo.github ? `<div class="contact-item"><a href="${resumeData.personalInfo.github}">GitHub Profile</a></div>` : ''}
            ${resumeData.personalInfo.website ? `<div class="contact-item"><a href="${resumeData.personalInfo.website}">Portfolio Website</a></div>` : ''}
          </div>
        </div>

        ${displayContent.careerSummary ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="summary-text">${displayContent.careerSummary}</p>
          </div>
        ` : ''}

        ${displayContent.professionalExperience.length > 0 ? `
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${displayContent.professionalExperience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>
                  </div>
                  <div class="item-duration">${exp.duration}</div>
                </div>
                <div class="item-description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${displayContent.optimizedProjects.length > 0 ? `
          <div class="section">
            <div class="section-title">Featured Projects</div>
            ${displayContent.optimizedProjects.map(project => `
              <div class="project-item">
                <div class="item-header">
                  <div class="item-title">${project.title}</div>
                </div>
                <div class="item-description">${project.description}</div>
                ${project.technologies.length > 0 ? `
                  <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="two-column">
          ${resumeData.education.length > 0 ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${resumeData.education.map(edu => `
                <div class="education-item">
                  <div class="item-header">
                    <div>
                      <div class="item-title">${edu.degree}</div>
                      <div class="item-company">${edu.institution}</div>
                      ${edu.honors ? `<div style="font-size: 9px; color: #666; margin-top: 2px;">${edu.honors}</div>` : ''}
                    </div>
                    <div class="item-duration">
                      ${edu.year}
                      ${edu.gpa ? `<br>GPA: ${edu.gpa}` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) ? `
            <div class="section">
              <div class="section-title">Technical Skills</div>
              <div class="skills-grid">
                ${[...resumeData.skills.technical, ...resumeData.skills.soft].map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        ${resumeData.certifications.length > 0 ? `
          <div class="section">
            <div class="section-title">Certifications & Credentials</div>
            ${resumeData.certifications.map(cert => `
              <div class="cert-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${cert.name}</div>
                    <div class="item-company">${cert.issuer}</div>
                  </div>
                  <div class="item-duration">
                    ${cert.date}
                    ${cert.expiryDate ? `<br>Expires: ${cert.expiryDate}` : ''}
                  </div>
                </div>
                ${cert.credentialId ? `<div class="item-description">Credential ID: ${cert.credentialId}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resumeData.languages.length > 0 ? `
          <div class="section">
            <div class="section-title">Languages</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${resumeData.languages.map(lang => `<span class="skill-tag">${lang}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
    `;
  },
};