'use client';

import StepList from '@/components/StepList';
import React, { useEffect, useMemo, useState } from 'react';
import {
  BiometricSvg,
  CrossSvg,
  DocumentSvg,
  EmploymentSvg,
  IDCard,
  LocationSvg,
  Passport,
  Photograph,
  ShieldSvg,
} from '@/components/svgs';
import { getUserProfile } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { PageLoader } from '@/components/Navigation';
import Image from 'next/image';
import { CustomButton, CustomInput, SideDrawer } from '@/components/elements';
import { BsArrowUpRight } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import Modal from '@/components/Modal';

import { AiTwotoneEdit } from 'react-icons/ai';
import { RiAttachment2 } from 'react-icons/ri';
import CopyIcon from '@/components/CopyIcon';
import { useRouter, redirect } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { textReplacer } from '@/util/helpers';
import HeaderNav from '@/components/HeaderNav';
import axiosInstance from '@/util/axios';
import toast from 'react-hot-toast';
import { handleError } from '@/util/errorHandler';

const page = () => {
  const { push, back } = useRouter();
  const [tracking, setTracking] = useState<string>('');
  const [showApplication, setShowApplication] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDoc, setShowDoc] = useState('');
  const [stepText, setStepText] = useState('');
  const [open, setOpen] = useState(false);
  const [openPhoneNumber, setOpenPhoneNumber] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isEmailOtp, setisEmailOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState<string>('');
  const [isPhoneOtp, setisPhoneOtp] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState<string>('');

  // edit phone number and email
  const showPhoneNumber = () => setOpenPhoneNumber(!openPhoneNumber);
  const onEmailOpen = () => setOpen(!open);
  const handleOpenPhoneOtp = () => setisEmailOtp(!isEmailOtp);
  const handleOpenEmailOtp = () => setisEmailOtp(!isEmailOtp);
  const closeModal = () => setModalOpen(false);



  const handleUpdatePhoneNumber = async () => {
    const data = { phone: phoneNumber };
    try {
      const res = await axiosInstance.post(`/biodata/update-contact`, data);
      toast.success(res.data.message);
      const respObj = res.data.data;
      const myObjectString = JSON.stringify(respObj);
      if (res) verifyPhoneOtp();

      localStorage.setItem('phoneOtp', myObjectString);
    } catch (error) {
      handleError(error);
    }
  };

  const verifyPhoneOtp = async () => {
    const returnedObj = localStorage.getItem('phoneOtp');
    const myObject = JSON.parse(returnedObj ?? '');

    const data = {
      hash: myObject.hash,
      phone: myObject.phone,
      code: phoneOtp,
    };
    try {
      const res = await axiosInstance.patch(
        `/biodata/verify-biodata-hash`,
        data
      );
      toast.success(res.data.message);

      if (res) window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdateEmail = async () => {
    const data = { email: newEmail };
    try {
      const res = await axiosInstance.post(`/biodata/update-contact`, data);
      toast.success(res.data.message);
      if (res) handleOpenEmailOtp();
      const respObj = res.data.data;
      const myObjectString = JSON.stringify(respObj);
      localStorage.setItem('emailOtp', myObjectString);
    } catch (error) {
      handleError(error);
    }
  };

  const disablBtn = emailOtp.length < 6;
  const disablPhoneBtn = phoneOtp.length < 6;

  const verifyEmailOtp = async () => {
    const returnedObj = localStorage.getItem('emailOtp');
    const myObject = JSON.parse(returnedObj ?? '');

    const data = {
      hash: myObject.hash,
      email: myObject.email,
      code: emailOtp,
    };
    try {
      const res = await axiosInstance.patch(
        `/biodata/verify-biodata-hash`,
        data
      );
      toast.success(res.data.message);

      if (res) window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const { data: applicant, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    localStorage?.setItem('tracking_id', applicant?.tracking_id);
  }, []);

  useEffect(() => {
    const getTrackingId = () => {
      const trackingId = localStorage?.getItem('tracking_id') ?? '';
      setTracking(trackingId);
    };
    getTrackingId();
  }, []);

  const oneApplicant = useMemo(() => {
    return applicant;
  }, [applicant]);



  const queryHeaders = oneApplicant?.bio_query?.query_headers ?? [];

  const steps = [
    {
      title: 'Verify NIN',
      subtitle: 'National Identification Number',
      icon: <IDCard />,
      isCompleted: true,
    },
    {
      title: 'Biometrics',
      subtitle: 'SComplete your biometrics',
      icon: <BiometricSvg />,
      isCompleted: true,
    },
    {
      title: 'Passport',
      subtitle: 'Scan your passport',
      icon: <Passport />,
      isCompleted: oneApplicant?.has_scanned_passport === 1,
      isQueried: queryHeaders.includes('scanned_passport'),
      name: 'passport',
      link: queryHeaders.includes('scanned_passport')
        ? '/dashboard/biodata/update-application/passport'
        : oneApplicant?.has_scanned_passport === 1
          ? ''
          : '/dashboard/biodata/new-application/passport',
    },
    {
      title: 'Photograph',
      subtitle: 'Upload recent photograph',
      icon: <Photograph />,
      isCompleted: oneApplicant?.bio_data?.photography?.has_photography === 1,
      name: 'photograph',
      isQueried: queryHeaders.includes('photograph'),
      link: queryHeaders.includes('photograph')
        ? '/dashboard/biodata/update-application/photograph'
        : oneApplicant?.bio_data?.photography?.has_photography === 1
          ? ''
          : '/dashboard/biodata/new-application/photograph',
    },
    {
      title: 'Address',
      subtitle: 'Input delivery address',
      icon: <LocationSvg />,
      isCompleted: oneApplicant?.bio_data?.address?.has_address === 1,
      name: 'address',
      isQueried: queryHeaders.includes('address'),
      link: queryHeaders.includes('address')
        ? '/dashboard/biodata/update-application/address'
        : oneApplicant?.bio_data?.address?.has_address === 1
          ? ''
          : '/dashboard/biodata/new-application/address',
    },
    {
      title: 'Education',
      subtitle: 'Scan your certifications',
      icon: <DocumentSvg />,
      isCompleted: oneApplicant?.has_education === 1,
      name: 'education',
      isQueried: queryHeaders.includes('education'),
      link: queryHeaders.includes('education')
        ? '/dashboard/biodata/update-application/education'
        : oneApplicant?.has_education === 1
          ? ''
          : '/dashboard/biodata/new-application/education',
    },
    {
      title: 'Employment',
      subtitle: 'Input Employer Details',
      icon: <EmploymentSvg />,
      isCompleted: oneApplicant?.has_employment === 1,
      name: 'employment',
      isQueried: queryHeaders.includes('employment'),
      link: queryHeaders.includes('employment')
        ? '/dashboard/biodata/update-application/employment'
        : oneApplicant?.has_employment === 1
          ? ''
          : '/dashboard/biodata/new-application/employment',
    },
    {
      title: 'Police Report',
      subtitle: 'Request police report',
      icon: <ShieldSvg />,
      isCompleted: oneApplicant?.has_police_report === 1,
      name: 'police_Report',
      isQueried: queryHeaders.includes('police_report'),
      link: queryHeaders.includes('police_report')
        ? '/dashboard/biodata/update-application/police-report'
        : oneApplicant?.has_police_report === 1
          ? ''
          : '/dashboard/biodata/new-application/police-report',
    },
    {
      title: 'Medical Report',
      subtitle: 'Scan medical report',
      icon: <CrossSvg />,
      isCompleted: oneApplicant?.has_medicals === 1,
      name: 'medical_report',
      isQueried: queryHeaders.includes('medicals'),
      link: queryHeaders.includes('medicals')
        ? '/dashboard/biodata/update-application/medical_report'
        : oneApplicant?.has_medicals === 1
          ? ''
          : '/dashboard/biodata/new-application/medical_report',
    },
  ];

  const base64 = oneApplicant?.photograph
    ? `data:image/png;base64,${oneApplicant?.photograph}`
    : '/images/profile-avatar.png';

  const showit = (s: any) => {
    setShowDoc(s.file);
    setStepText(s.label);
    setModalOpen(true);
  };

  let mimeType = '';

  if (showDoc?.startsWith('/9j/')) {
    mimeType = 'image/jpeg';
  } else if (showDoc?.startsWith('iVBORw0KGgo')) {
    mimeType = 'image/png';
  } else if (showDoc?.startsWith('JVBER')) {
    mimeType = 'application/pdf';
  }

  const viewTheDoc = `data:${mimeType};base64,${showDoc}`;

  const documents = [
    {
      label: 'Passport',
      file: oneApplicant?.bio_data?.scanned_passport?.details?.base_64,
    },
    {
      label: 'Education Certificate',
      file: oneApplicant?.bio_data?.education?.details?.base_64,
    },
    {
      label: 'Employment Letter',
      file: oneApplicant?.bio_data?.employment?.details?.offer_letter,
    },
    {
      label: 'Police Report',
      file: oneApplicant?.bio_data?.police_report?.details?.base_64,
    },
    {
      label: 'Medical Report',
      file: oneApplicant?.bio_data?.medicals?.details?.base_64,
    },
  ];

  const basic_details = useMemo(() => {
    const data: any = {
      applicant_ID: (
        <div>
          <span>{oneApplicant?.user_code}</span>
        </div>
      ),
      full_name: oneApplicant?.name,
      email: oneApplicant?.email,
      phone_number: oneApplicant?.phone,
    };
    return data;
  }, [oneApplicant]);

  const has_item_count = steps?.filter(
    (step) => step.isCompleted == true
  ).length;

  useEffect(() => {
    // Define all the checks
    const isPending = applicant?.status === 'pending';
    const hasNoAddress = applicant?.bio_data?.has_address === 0;
    const hasNoEducation = applicant?.education?.has_education === 0;
    const hasNoEmployment = applicant?.employment?.has_employment === 0;
    const hasNoMedicals = applicant?.medicals?.has_medicals === 0;
    const hasNoPoliceReport = applicant?.police_report?.has_police_report === 0;
    const hasNoScannedPassport = applicant?.scanned_passport?.has_scanned_passport === 0;

    // Perform redirection if all conditions are met
    if (
      isPending &&
      (hasNoAddress ||
        hasNoEducation ||
        hasNoEmployment ||
        hasNoMedicals ||
        hasNoPoliceReport ||
        hasNoScannedPassport)
    ) {
      push('/dashboard/biodata/new-application/passport');
    }
  }, [applicant]);

  // if (applicant?.status === 'pending') redirect('/dashboard/biodata/new-application/passport')
  if (isLoading) return <PageLoader />;

  return (
    // <>
    //     <div className=''>
    //       {oneApplicant?.status !== 'approved' ? (
    //         <>
    //           <section className='p-3 md:p-10'>
    //             <p className='text-lg font-semibold text-[#101828]'>
    //               Basic Details
    //             </p>
    //             <div className='mt-12 gap-10 md:flex'>
    //               <section className='flex flex-1 flex-col gap-8'>
    //                 {Object.keys(basic_details).map((key, index) => (
    //                   <div key={index} className='flex gap-12'>
    //                     <span className='w-36 font-bold capitalize'>
    //                       {textReplacer(key, '_')}
    //                     </span>
    //                     <article className='flex flex-col'>
    //                       <span className=''>{basic_details[key]}</span>
    //                       {key === 'email' && (
    //                         <p onClick={onEmailOpen} className='flex cursor-pointer items-center gap-2 text-[#2B9957]'>
    //                           Update Email
    //                           <span><AiTwotoneEdit className='text-[#2B9957]' /></span>
    //                         </p>
    //                       )}

    //                       {key === 'phone_number' && (
    //                         <p
    //                           onClick={showPhoneNumber}
    //                           className='flex w-full cursor-pointer items-center gap-2 text-[#2B9957]'
    //                         >
    //                           Update Phone
    //                           <span>
    //                             <AiTwotoneEdit className='text-[#2B9957]' />
    //                           </span>
    //                         </p>
    //                       )}
    //                     </article>
    //                   </div>
    //                 ))}

    //                 <div className='flex gap-5'>
    //                   <div className='w-36 font-bold text-gray-900'>
    //                     Documents
    //                   </div>
    //                   <div className='flex flex-col gap-4'>
    //                     {documents?.map((doc, index) => (
    //                       <button
    //                         key={index}
    //                         className='flex w-fit items-center gap-1 rounded-2xl bg-[#F2F4F7] px-2 py-1 text-sm font-medium text-black'
    //                         onClick={() => showit(doc)}
    //                       >
    //                         <RiAttachment2 className='text-xl' />
    //                         <span>{doc.label}</span>
    //                       </button>
    //                     ))}
    //                   </div>
    //                 </div>

    //                 <CustomButton
    //                   text='Request biodata update'
    //                   onClick={() => push('/schedule')}
    //                   color='text-white'
    //                   className='mt-5 w-1/2 py-3'
    //                 />
    //               </section>
    //               <Image
    //                 src={base64}
    //                 className='mt-10 h-56 w-56 md:mt-0'
    //                 height={200}
    //                 width={200}
    //                 alt='applicant'
    //               />
    //             </div>

    //             {/* drawers */}
    //             <SideDrawer
    //               isOpen={openPhoneNumber}
    //               toggleDrawer={showPhoneNumber}
    //             >
    //               <p className='mt-10'>
    //                 Please enter your new phone number to continue
    //               </p>
    //               <CustomInput
    //                 id='phone'
    //                 label='Enter Your New Number'
    //                 placeholder='e.g 0701234567'
    //                 value={phoneNumber}
    //                 onChange={(e) => setPhoneNumber(e.target.value)}
    //                 className='my-3 mt-7'
    //               />
    //               <CustomButton
    //                 text='Continue'
    //                 onClick={handleUpdatePhoneNumber}
    //                 color='text-white'
    //                 className='mt-5 w-full text-left'
    //                 loading={loading}
    //               />
    //             </SideDrawer>
    //             <SideDrawer isOpen={open} toggleDrawer={onEmailOpen}>
    //               <p className='mt-10'>
    //                 Please enter your new email number to continue
    //               </p>
    //               <CustomInput
    //                 id='email'
    //                 label='Enter Your New Email'
    //                 placeholder='e.g johndoe@gmail.com'
    //                 value={newEmail}
    //                 onChange={(e) => setNewEmail(e.target.value)}
    //                 className='my-3 mt-7'
    //               />
    //               <CustomButton
    //                 text='Continue'
    //                 onClick={handleUpdateEmail}
    //                 color='text-white'
    //                 className='mt-5 w-full text-left'
    //                 loading={loading}
    //               />
    //             </SideDrawer>
    //             <SideDrawer
    //               isOpen={isEmailOtp}
    //               toggleDrawer={handleOpenEmailOtp}
    //             >
    //               <>
    //                 <h2 className='text-[18px] text-black'>Verify OTP</h2>
    //                 <p className='mb-6 mt-4 text-black'>
    //                   Enter the One Time Password sent to you
    //                 </p>
    //                 <InputOTP
    //                   value={emailOtp}
    //                   onChange={(value) => setEmailOtp(value)}
    //                   maxLength={6}
    //                   className='text-black'
    //                 >
    //                   <InputOTPGroup className='text-black'>
    //                     <InputOTPSlot index={0} className='text-black' />
    //                     <InputOTPSlot index={1} />
    //                     <InputOTPSlot index={2} />
    //                   </InputOTPGroup>
    //                   <InputOTPSeparator />
    //                   <InputOTPGroup className='text-black'>
    //                     <InputOTPSlot index={3} />
    //                     <InputOTPSlot index={4} />
    //                     <InputOTPSlot index={5} />
    //                   </InputOTPGroup>
    //                 </InputOTP>

    //                 <CustomButton
    //                   text='Continue'
    //                   disabled={disablBtn}
    //                   onClick={verifyEmailOtp}
    //                   className='mt-10 w-full py-3'
    //                 />
    //               </>
    //             </SideDrawer>
    //             <SideDrawer
    //               isOpen={isPhoneOtp}
    //               toggleDrawer={handleOpenPhoneOtp}
    //             >
    //               <>
    //                 <h2 className='text-[18px] text-black'>Verify OTP</h2>
    //                 <p className='mb-6 mt-4 text-black'>
    //                   Enter the One Time Password sent to you.
    //                 </p>
    //                 <InputOTP
    //                   value={phoneOtp}
    //                   onChange={(value) => setPhoneOtp(value)}
    //                   maxLength={6}
    //                   className='text-black'
    //                 >
    //                   <InputOTPGroup className='text-black'>
    //                     <InputOTPSlot index={0} className='text-black' />
    //                     <InputOTPSlot index={1} />
    //                     <InputOTPSlot index={2} />
    //                   </InputOTPGroup>
    //                   <InputOTPSeparator />
    //                   <InputOTPGroup className='text-black'>
    //                     <InputOTPSlot index={3} />
    //                     <InputOTPSlot index={4} />
    //                     <InputOTPSlot index={5} />
    //                   </InputOTPGroup>
    //                 </InputOTP>

    //                 <CustomButton
    //                   text='Continue'
    //                   disabled={disablPhoneBtn}
    //                   onClick={verifyEmailOtp}
    //                   className='mt-10 w-full py-3'
    //                 />
    //               </>
    //             </SideDrawer>
    //           </section>
    //           <Modal
    //             isOpen={isModalOpen}
    //             onClose={closeModal}
    //             title={stepText || ''}
    //             content={
    //               <>
    //                 {showDoc?.length > 0 ? (
    //                   <>
    //                     {mimeType === 'application/pdf' ? (
    //                       <iframe
    //                         src={viewTheDoc}
    //                         title='PDF Viewer'
    //                         className='min-h-[600px] w-full'
    //                       />
    //                     ) : (
    //                       <img
    //                         src={viewTheDoc}
    //                         alt='Document Preview'
    //                         style={{ maxWidth: '100%', minHeight: '600px' }}
    //                       />
    //                     )}
    //                   </>
    //                 ) : (
    //                   <section className='flex items-center justify-center'>
    //                     <p>Applicant hasn't uploaded their {stepText}</p>
    //                   </section>
    //                 )}
    //               </>
    //             }
    //           />
    //         </>
    //       ): (
    //         <div className='mt-32 grid justify-center'>
    //           <section className='rounded-2xl border p-6'>
    //             <div className='flex justify-center'>
    //               <Image
    //                 src='/images/Docreview.png'
    //                 alt='review'
    //                 width={400}
    //                 height={400}
    //                 className='object-cover'
    //               />
    //             </div>
    //             <p className='mt-3 text-xl font-semibold'>Document Review</p>
    //             <p className='my-7 text-lg'>
    //               Your documents will be reviewed and you should get a<br />
    //               feedback within 48 hours.
    //             </p>

    //             {oneApplicant?.bio_query?.query_headers?.length > 0 ||
    //             oneApplicant?.status === 'approved' ? (
    //               <></>
    //             ) : (
    //               <section className='mt-5 flex justify-between rounded-lg border p-5'>
    //                 <p>Tracking ID</p>
    //                 <CopyIcon
    //                   textToCopy={applicant?.tracking_id ?? ''}
    //                   text={applicant?.tracking_id ?? ''}
    //                 />
    //               </section>
    //             )}
    //             {oneApplicant?.bio_query?.query_headers?.length > 0 ? (
    //               <section className='mt-10 rounded-lg border border-[#FEE4E2] bg-[#FEF3F2] p-6'>
    //                 <p className='text-lg font-semibold'>ADMIN QUERY</p>
    //                 <p>
    //                   {oneApplicant?.bio_query?.comment + ' '}
    //                   {oneApplicant?.bio_query?.query_headers.join(', ')}
    //                 </p>
    //               </section>
    //             ) : (
    //               ''
    //             )}
    //             {oneApplicant?.status === 'approved' ? (
    //               <section
    //                 className={`mt-14 rounded-lg border border-[##C1EBD2] bg-[#EBF9F0] p-6`}
    //               >
    //                 <p className={`text-lg font-semibold`}>
    //                   APPLICATION APPROVED
    //                 </p>
    //               </section>
    //             ) : (
    //               ''
    //             )}
    //             {oneApplicant?.status === 'approved' ? (
    //               ' '
    //             ) : (
    //               <>
    //                 {oneApplicant?.bio_query?.query_headers?.length > 0 ? (
    //                   <CustomButton
    //                     text='Update Application'
    //                     onClick={() => setShowApplication(true)}
    //                     color='text-white'
    //                     iconPosition='right'
    //                     icon={<BsArrowUpRight />}
    //                     className='mt-5 flex w-full justify-center py-3 text-center text-lg'
    //                   />
    //                 ) : (
    //                   <CustomButton
    //                     text={'Track Application'}
    //                     onClick={() => push('/schedule')}
    //                     color='text-white'
    //                     iconPosition='right'
    //                     icon={<BsArrowUpRight />}
    //                     className='mt-5 flex w-full justify-center py-3 text-center text-lg'
    //                   />
    //                 )}
    //               </>
    //             )}
    //           </section>
    //         </div>
    //       )}
    //     </div>
    //   <>
    //   {showApplication === true && (
    //     <section className='col-span-5 h-fit rounded-lg border p-10'>
    //       <p className='text-lg font-semibold'>
    //         {/* Applicant Biodata ({has_item_count}/{steps?.length}) */}
    //         Applicant Biodata
    //       </p>
    //       <p className='my-5'>
    //         You need to complete your application in order to request for
    //         your NATEP Certificate.
    //       </p>
    //       {steps.map((step, index) => (
    //         <StepList
    //           key={index}
    //           icon={step.icon}
    //           title={step.title}
    //           subtitle={step.subtitle}
    //           isCompleted={step.isCompleted}
    //           link={step.link}
    //           isQueried={step.isQueried}
    //         />
    //       ))}
    //     </section>
    //   )}
    //   </>
    // </>

    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className=''>
          {oneApplicant?.status === 'approved' ? (
            <>
              <section className='p-3 md:p-10'>
                <p className='text-lg font-semibold text-[#101828]'>
                  Basic Details
                </p>
                <div className='mt-12 gap-10 md:flex'>
                  <section className='flex flex-1 flex-col gap-8'>
                    {Object.keys(basic_details).map((key, index) => (
                      <div key={index} className='flex gap-12'>
                        <span className='w-36 font-bold capitalize'>
                          {textReplacer(key, '_')}
                        </span>
                        <article className='flex flex-col'>
                          <span className=''>{basic_details[key]}</span>
                          {key === 'email' && (
                            <p
                              onClick={onEmailOpen}
                              className='flex cursor-pointer items-center gap-2 text-[#2B9957]'
                            >
                              Update Email
                              <span>
                                <AiTwotoneEdit className='text-[#2B9957]' />
                              </span>
                            </p>
                          )}

                          {key === 'phone_number' && (
                            <p
                              onClick={showPhoneNumber}
                              className='flex w-full cursor-pointer items-center gap-2 text-[#2B9957]'
                            >
                              Update Phone
                              <span>
                                <AiTwotoneEdit className='text-[#2B9957]' />
                              </span>
                            </p>
                          )}
                        </article>
                      </div>
                    ))}

                    <div className='flex gap-5'>
                      <div className='w-36 font-bold text-gray-900'>
                        Documents
                      </div>
                      <div className='flex flex-col gap-4'>
                        {documents?.map((doc, index) => (
                          <button
                            key={index}
                            className='flex w-fit items-center gap-1 rounded-2xl bg-[#F2F4F7] px-2 py-1 text-sm font-medium text-black'
                            onClick={() => showit(doc)}
                          >
                            <RiAttachment2 className='text-xl' />
                            <span>{doc.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <CustomButton
                      text='Request biodata update'
                      onClick={() => push('/schedule')}
                      color='text-white'
                      className='mt-5 w-1/2 py-3'
                    />
                  </section>
                  <Image
                    src={base64}
                    className='mt-10 h-56 w-56 md:mt-0'
                    height={200}
                    width={200}
                    alt='applicant'
                  />
                </div>

                {/* drawers */}
                <SideDrawer
                  isOpen={openPhoneNumber}
                  toggleDrawer={showPhoneNumber}
                >
                  <p className='mt-10'>
                    Please enter your new phone number to continue
                  </p>
                  <CustomInput
                    id='phone'
                    label='Enter Your New Number'
                    placeholder='e.g 0701234567'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='my-3 mt-7'
                  />
                  <CustomButton
                    text='Continue'
                    onClick={handleUpdatePhoneNumber}
                    color='text-white'
                    className='mt-5 w-full text-left'
                    loading={loading}
                  />
                </SideDrawer>
                <SideDrawer isOpen={open} toggleDrawer={onEmailOpen}>
                  <p className='mt-10'>
                    Please enter your new email number to continue
                  </p>
                  <CustomInput
                    id='email'
                    label='Enter Your New Email'
                    placeholder='e.g johndoe@gmail.com'
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className='my-3 mt-7'
                  />
                  <CustomButton
                    text='Continue'
                    onClick={handleUpdateEmail}
                    color='text-white'
                    className='mt-5 w-full text-left'
                    loading={loading}
                  />
                </SideDrawer>
                <SideDrawer
                  isOpen={isEmailOtp}
                  toggleDrawer={handleOpenEmailOtp}
                >
                  <>
                    <h2 className='text-[18px] text-black'>Verify OTP</h2>
                    <p className='mb-6 mt-4 text-black'>
                      Enter the One Time Password sent to you
                    </p>
                    <InputOTP
                      value={emailOtp}
                      onChange={(value) => setEmailOtp(value)}
                      maxLength={6}
                      className='text-black'
                    >
                      <InputOTPGroup className='text-black'>
                        <InputOTPSlot index={0} className='text-black' />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup className='text-black'>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    <CustomButton
                      text='Continue'
                      disabled={disablBtn}
                      onClick={verifyEmailOtp}
                      className='mt-10 w-full py-3'
                    />
                  </>
                </SideDrawer>
                <SideDrawer
                  isOpen={isPhoneOtp}
                  toggleDrawer={handleOpenPhoneOtp}
                >
                  <>
                    <h2 className='text-[18px] text-black'>Verify OTP</h2>
                    <p className='mb-6 mt-4 text-black'>
                      Enter the One Time Password sent to you.
                    </p>
                    <InputOTP
                      value={phoneOtp}
                      onChange={(value) => setPhoneOtp(value)}
                      maxLength={6}
                      className='text-black'
                    >
                      <InputOTPGroup className='text-black'>
                        <InputOTPSlot index={0} className='text-black' />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup className='text-black'>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    <CustomButton
                      text='Continue'
                      disabled={disablPhoneBtn}
                      onClick={verifyEmailOtp}
                      className='mt-10 w-full py-3'
                    />
                  </>
                </SideDrawer>
              </section>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={stepText || ''}
                content={
                  <>
                    {showDoc?.length > 0 ? (
                      <>
                        {mimeType === 'application/pdf' ? (
                          <iframe
                            src={viewTheDoc}
                            title='PDF Viewer'
                            className='min-h-[600px] w-full'
                          />
                        ) : (
                          <img
                            src={viewTheDoc}
                            alt='Document Preview'
                            style={{ maxWidth: '100%', minHeight: '600px' }}
                          />
                        )}
                      </>
                    ) : (
                      <section className='flex items-center justify-center'>
                        <p>Applicant hasn't uploaded their {stepText}</p>
                      </section>
                    )}
                  </>
                }
              />
            </>
          ) : showApplication ? (
            <section className='col-span-5 h-fit rounded-lg border p-10'>
              <p className='text-lg font-semibold'>
                {/* Applicant Biodata ({has_item_count}/{steps?.length}) */}
                Applicant Biodata
              </p>
              <p className='my-5'>
                You need to complete your application in order to request for
                your NATEP Certificate.
              </p>
              {steps.map((step, index) => (
                <StepList
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  subtitle={step.subtitle}
                  isCompleted={step.isCompleted}
                  link={step.link}
                  isQueried={step.isQueried}
                />
              ))}
            </section>
          ) : (
            <div className='mt-32 grid justify-center'>
              <section className='rounded-2xl border p-6'>
                <div className='flex justify-center'>
                  <Image
                    src='/images/Docreview.png'
                    alt='review'
                    width={400}
                    height={400}
                    className='object-cover'
                  />
                </div>
                <p className='mt-3 text-xl font-semibold'>Document Review</p>
                <p className='my-7 text-lg'>
                  Your documents will be reviewed and you should get a<br />
                  feedback within 48 hours.
                </p>

                {oneApplicant?.bio_query?.query_headers?.length > 0 ||
                oneApplicant?.status === 'approved' ? (
                  <></>
                ) : (
                  <section className='mt-5 flex justify-between rounded-lg border p-5'>
                    <p>Tracking ID</p>
                    <CopyIcon
                      textToCopy={applicant?.tracking_id ?? ''}
                      text={applicant?.tracking_id ?? ''}
                    />
                  </section>
                )}
                {oneApplicant?.bio_query?.query_headers?.length > 0 ? (
                  <section className='mt-10 rounded-lg border border-[#FEE4E2] bg-[#FEF3F2] p-6'>
                    <p className='text-lg font-semibold'>ADMIN QUERY</p>
                    <p>
                      {oneApplicant?.bio_query?.comment + ' '}
                      {oneApplicant?.bio_query?.query_headers.join(', ')}
                    </p>
                  </section>
                ) : (
                  ''
                )}
                {oneApplicant?.status === 'approved' ? (
                  <section
                    className={`mt-14 rounded-lg border border-[##C1EBD2] bg-[#EBF9F0] p-6`}
                  >
                    <p className={`text-lg font-semibold`}>
                      APPLICATION APPROVED
                    </p>
                  </section>
                ) : (
                  ''
                )}
                {oneApplicant?.status === 'approved' ? (
                  ' '
                ) : (
                  <>
                    {oneApplicant?.bio_query?.query_headers?.length > 0 ? (
                      <CustomButton
                        text='Update Application'
                        onClick={() => setShowApplication(true)}
                        color='text-white'
                        iconPosition='right'
                        icon={<BsArrowUpRight />}
                        className='mt-5 flex w-full justify-center py-3 text-center text-lg'
                      />
                    ) : (
                      <CustomButton
                        text={'Track Application'}
                        onClick={() => push('/schedule')}
                        color='text-white'
                        iconPosition='right'
                        icon={<BsArrowUpRight />}
                        className='mt-5 flex w-full justify-center py-3 text-center text-lg'
                      />
                    )}
                  </>
                )}
              </section>
            </div>
          )}
        </div>
      )}
    </>

  );
};

export default page;
