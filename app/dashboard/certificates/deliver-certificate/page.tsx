'use client'

import CustomButton from '@/components/Custom/CustomButton'
import CustomInput from '@/components/Custom/CustomInput'
import CustomSelect from '@/components/Custom/CustomSelect'
import Image from 'next/image'
import React, { useState } from 'react'
import { GoChevronRight } from "react-icons/go";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const events = [
    {
      title: "NATEP Headquarters",
      address: "1609 Admiralty Way, WUSE Zone 6",
      date: "TUES, 06 DEC 2022"
    },
    {
      title: "NATEP Headquarters",
      address: "1609 Admiralty Way, WUSE Zone 6",
      date: "TUES, 06 DEC 2022"
    },
    {
      title: "NATEP Headquarters",
      address: "1609 Admiralty Way, WUSE Zone 6",
      date: "TUES, 06 DEC 2022"
    },
    

    // Add more events as needed
  ];

  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' }
  ]
  return (
    <Sheet>
      <div className="grid grid-cols-1 gap-4 md:mx-56 lg:grid-cols-2 lg:gap-16">
        <div className="rounded-lg md:border md:p-20">
          <p className='font-bold text-lg'>Request Delivery</p>
          <p className="font-light mt-3">Kindly provide the required details below to fulfill your delivery request.</p>

          <CustomInput
            id="partyName"
            label="Relying Party Name"
            placeholder=""
            onChange={(e) => console.log(e.target.value)}
            className="my-3 mt-5"
          />
          <CustomInput
            id="emailAddress"
            label="Contact Email"
            type="email"
            placeholder="ola@gmail.com"
            onChange={(e) => console.log(e.target.value)}
            className="my-4"
          />
          <CustomInput
            id="phone"
            label="Contact Phone"
            type="number"
            placeholder="080xxxxxx"
            onChange={(e) => console.log(e.target.value)}
            className="my-3"
          />

          <CustomSelect
            label="Country"
            name="color"
            id="color-select"
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            className="mt-5"
          />

          <CustomSelect
            label="State"
            name="color"
            id="color-select"
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            className="mt-5"
          />

          <div className='mt-5'>
            <label htmlFor="address" className="block font-medium text-[16px] text-gray-700">Address</label>

            <textarea
              id="OrderNotes"
              className="mt-2 w-full rounded-lg border-gray-200 border p-4 align-top shadow-sm sm:text-sm"
              rows={4}
              placeholder="input address."
            ></textarea>
          </div>

          <CustomButton text='Continue' className='w-full mt-7 py-4' />
        </div>
        <div className="rounded-lg md:border md:p-20">
          <p className='font-bold text-lg'>Ongoing Deliveries</p>
          {/* <div className="grid items-center justify-center">
            <Image 
              src='/images/emptystate.png'
              alt='nav logo'
              width={400}
              height={400}
              className=""
            />
            <p className='text-2xl font-bold text-center'>No Delivery</p>
            <p className="font-light text-center mt-5">You do not have any ongoing delivery. Please click<br /> on the button below to request a delivery.</p>
          </div> */}
          <SheetTrigger asChild className='mt-10 cursor-pointer'>
            <div>
              <p className='text-muted-foreground'>TUESDAY, 06 DEC 2022</p>
              <hr className='my-4 text-gray-400' />
              <article className="flex justify-between">
                <article>
                  <p className='text-xl font-bold'>Consular Services, Germany</p>
                  <p>REF #34928427</p>
                </article>
                <article className='flex items-center'>
                <GoChevronRight />
                </article>
              </article>
            </div>
          </SheetTrigger>
          <SheetContent className='pt-10'>
            <p className='mt-10 mb-16 font-bold text-lg'>REF #34928427</p>
            {events.map((task, index) => (
              <div key={index} className="flex gap-x-3">
                <div className={`relative ${index === events.length - 1 ? '' : 'after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-[#A3E2BC]'}`}>
                  <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                  <article className='flex justify-between mt-[1px]'>
                    <article>
                      <h3 className="flex gap-x-1.5 font-semibold text-gray-800">
                        {task.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {task.address}
                      </p>
                    </article>
                    <article>
                      <h3 className="flex gap-x-1.5 font-semibold text-gray-800">
                        {task.date}
                      </h3>
                    </article>
                  </article>
                </div>
              </div>
            ))}
          </SheetContent>
        </div>
      </div>
    </Sheet>
  )
}

export default page