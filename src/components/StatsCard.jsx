const stats = [
  {
    title: 'Revenue',
    value: 'Rp 12.5M',
  },
  {
    title: 'Orders',
    value: '245',
  },
  {
    title: 'Customers',
    value: '1.2K',
  },
  {
    title: 'Rating',
    value: '4.9★',
  },
]

export default function StatsCard() {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5'>

      {stats.map((item, index) => (
        <div
          key={index}
          className='bg-[#1F1F1F] border border-[#2A2A2A] rounded-3xl p-6'
        >
          <p className='text-gray-400 mb-3'>{item.title}</p>

          <h2 className='text-3xl font-bold text-[#B98B73]'>
            {item.value}
          </h2>
        </div>
      ))}

    </div>
  )
}