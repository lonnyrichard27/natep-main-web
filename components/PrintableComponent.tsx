import Image from 'next/image';
import React from 'react';

// Define the props type
type PrintableComponentProps = {
  trackingID: string;
  date: string;
  // time: string;
  activityType: string;
  address: string;
  contactNumber: string;
  // agent: string;
  // applicantID: string;
  fullName: string;
  email: string;
  // number: string;
};

const PrintableComponent = React.forwardRef<
  HTMLDivElement,
  PrintableComponentProps
>((props, ref) => {
  return (
    <div ref={ref} className="p-5">
      <div className="text-center mb-7">
        <Image
          src="/images/pdfprintlogo.png"
          alt="nav logo"
          width={150}
          height={150}
          className="w-full"
        />
      </div>

      <div className="border-b border-r border-t bg-[#E4E7EC] border-gray-200 p-4">
        <p className="text-gray-600 font-medium">Appointment Schedule</p>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Tracking ID</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.trackingID}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Date</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.date}</p>
          </div>

          {/* <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Time</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.time}</p>
          </div> */}

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Activity Type</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.activityType}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Address</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.address}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Phone Number</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.contactNumber}</p>
          </div>

          {/* <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Agent</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.agent}</p>
          </div> */}
        </div>
      </div>

      <div className="border-b border-r border-t mt-7 bg-[#E4E7EC] border-gray-200 p-4">
        <p className="text-gray-600 font-medium">Applicant Details</p>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          {/* <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Applicant ID</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.applicantID}</p>
          </div> */}

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Full Name</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.fullName}</p>
          </div>

          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Email</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.email}</p>
          </div>

          {/* <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-gray-600 font-medium">Number</p>
          </div>
          <div className="border-b border-r border-t border-gray-200 p-4">
            <p className="text-black font-medium">{props.number}</p>
          </div> */}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-6">
        <p className="text-lg font-semibold text-gray-900 mb-4">
          Carefully follow these instructions:
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            Ensure you are the NATEP office at least 30mins before your
            scheduled time.
          </li>
          <li>
            Carry along the following documents for your application:
            <ul className="list-inside list-[lower-alpha] pl-5 space-y-1">
              <li>Appointment Schedule</li>
              <li>Passport Document</li>
              <li>Clear Photograph</li>
              <li>Education Certificates</li>
              <li>Employment Letter</li>
              <li>Police Report</li>
              <li>Medical Report</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
});

export default PrintableComponent;
