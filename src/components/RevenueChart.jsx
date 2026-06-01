export default function RevenueChart() {
  return (
<<<<<<< HEAD
    <div className="crm-chart-card">
      <div className="crm-section-title">
        Revenue Chart
      </div>

      <div className="crm-chart-placeholder">
        Chart Area
      </div>
    </div>
  );
=======
    <section className='mt-10 bg-[#1F1F1F] border border-[#2A2A2A] rounded-3xl p-8'>

      <h2 className='text-2xl font-bold mb-6'>Revenue Analytics</h2>

      <div className='grid grid-cols-7 items-end gap-4 h-64'>

        {[40, 70, 55, 90, 60, 110, 80].map((height, index) => (
          <div
            key={index}
            className='bg-[#8B5E3C] rounded-t-2xl'
            style={{ height: `${height}%` }}
          ></div>
        ))}

      </div>

    </section>
  )
>>>>>>> 3d93e1fbf9eb9ea88d4c4fb1573108f2661a17fd
}