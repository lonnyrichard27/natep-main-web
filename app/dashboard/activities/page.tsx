import Badge from '@/components/Badge'
import React from 'react'

const page = () => {
  return (
    <div>
      <section className="md:flex justify-between">

      </section>
      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">TimeStamp</th>
              <th scope="col" className="px-6 py-3">ACTIVITY</th>
              <th scope="col" className="px-6 py-3">STATUS</th>
              <th scope="col" className="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr className=' border-b py-10'>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Apple MacBook Pro 17"</th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">
                  <Badge title='Details' />
                </td>
            </tr>
            <tr className=' border-b'>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Apple MacBook Pro 17"</th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">
                  <Badge title='Details' />
                </td>
            </tr>
            <tr className=' border-b'>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Apple MacBook Pro 17"</th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">
                  <Badge title='Details' />
                </td>
            </tr>
            <tr className=' border-b'>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Apple MacBook Pro 17"</th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">
                  <Badge title='Details' />
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page