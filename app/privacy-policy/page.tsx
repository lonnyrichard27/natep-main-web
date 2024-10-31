'use client';

import { Navbar, Footer } from '@/components/Navigation';
import React from 'react';

const PrivacyPolicyPage = () => {
  const privacy_document = [
    {
      title: 'Data We Collect',
      content: [
        'We collect and process personal data necessary to provide you with our services. This includes:',
        'Personal Information: Full name, contact details, date of birth, nationality, and National Identification Numbers (NIN).',
        'Biometric Data: Fingerprint or facial recognition data used for identity verification.',
        'Usage Data: Information about how you interact with the NATEP app, including access times, pages viewed, and features used.',
        'Device Information: Information about your device, such as device type, operating system, and unique device identifiers.',
        "Employer Information: Information on the identity and authenticity of an applicant's Employer including Company names, address and contact information.",
      ],
    },
    {
      title: 'How We Use Your Data',
      content: [
        'We use your data solely for the purpose of delivering our services, ensuring platform security, and improving your user experience. Specifically, we use your data to:',
      ],
      list: [
        'Facilitate the Talent Export Enrollment and Certification process.',
        'Verify your identity through biometric authentication.',
        'Provide you with updates on your application status.',
        'Improve our services by analyzing how users interact with the app.',
        'Ensure the security of your account and our platform.',
      ],
    },
    {
      title: 'Privacy by Design and Privacy by Default',
      content: [
        'At NATEP, we have implemented Privacy by Design and Privacy by Default principles into every aspect of our app including:',
      ],
      list: [
        'Minimal Data Collection: We only collect personal data that is necessary for the functionality of the app.',
        'Data Encryption: All personal and biometric data is encrypted both in transit and at rest to prevent unauthorized access.',
        'User Control: You have full control over your personal data, including options to view, modify, or delete your data at any time.',
        'Default Privacy Settings: By default, your data is treated as confidential and not shared with third parties unless explicitly required for the purpose of providing our services or as mandated by law.',
      ],
    },
    {
      title: 'Data Sharing and Third Parties',
      content: [
        'We do not share your personal data with third parties except in the following cases:',
      ],
      list: [
        "Service Providers: Our trusted technical partner(s) responsible for developing and maintaining the NATEP platform, may access your data solely for technical purposes related to the app's operation.",
        'Legal and Regulatory Compliance: We may disclose your data if required by law or in response to legal proceedings.',
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'Your personal data will be retained only for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws. Biometric data is securely stored and only retained during the certification process, after which it is anonymized or deleted.',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'Under data protection regulations, you have the following rights:',
      ],
      list: [
        'Right to Access: Request a copy of the personal data we hold about you.',
        'Right to Rectification: Correct any inaccurate or incomplete data.',
        'Right to Erasure: Request deletion of your personal data, subject to legal exceptions.',
        'Right to Restrict Processing: Limit how we use your data in certain circumstances.',
        'Right to Data Portability: Request your personal data in a structured, commonly used format.',
      ],
    },
    {
      title: 'Security Measures',
      content: [
        'We implement advanced security measures to protect your personal data, including:',
      ],
      list: [
        'End-to-End Encryption: Personal data is encrypted throughout its journey, from collection to storage.',
        'Regular Security Audits: Our platform undergoes regular security checks to ensure ongoing protection against threats.',
        'Access Controls: Only authorized personnel have access to sensitive personal information.',
      ],
    },
    {
      title: 'Updates to the Privacy Policy',
      content: [
        'This Privacy Policy may be updated periodically to reflect changes in our practices, technologies, or legal requirements. Any significant changes will be communicated to you via the app.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have any questions or concerns regarding this Privacy Policy, please contact us at: info@natep.gov.ng or +234704 588 4848.',
        'Our Location: 464 Iya Abubakar Crescent, off Alex Ekwueme Way, Jabi, Abuja, Nigeria 900108.',
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <div className='bg-background-gray py-20'>
        <div className='mx-auto flex flex-col gap-12 bg-white p-10 text-sm font-light leading-6 lg:w-[720px]'>
          <div>
            <h1 className='mb-2 text-lg font-semibold text-[#101828]'>
              Privacy Policy for the National Talent Export Programme (NATEP)
              App
            </h1>
            <p className='text-[#344054]'>Effective Date: 01 JUL 2024</p>

            <p className='mt-6'>
              At NATEP, we are committed to safeguarding your personal data and
              ensuring your privacy. This Privacy Policy outlines how we
              collect, use, protect, and share your information in compliance
              with the latest data protection regulations, including principles
              of privacy by design and privacy by default.
            </p>
          </div>

          <div>
            {privacy_document?.map((doc, index) => (
              <div key={index} className='mb-12 flex flex-col gap-4'>
                <h2 className='text-base font-bold capitalize'>
                  {index + 1}.&nbsp;{doc?.title}
                </h2>
                {doc?.content?.map((content, index) => (
                  <p key={index}>{content}</p>
                ))}
                {doc?.list && (
                  <ul className='flex list-disc flex-col gap-2 pl-5'>
                    {doc?.list?.map((list, index) => (
                      <li key={index}>{list}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
