<<<<<<< HEAD
export default function StatsCard({
  title,
  value,
  growth,
}) {
  return (
    <div className="crm-stats-card">
      <div className="crm-stats-title">
        {title}
      </div>

      <div className="crm-stats-value">
        {value}
      </div>

      <div className="crm-stats-growth">
        {growth}
      </div>
    </div>
  );
=======
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
>>>>>>> 3d93e1fbf9eb9ea88d4c4fb1573108f2661a17fd
}