export default function News() {
  const journeyItems = [
    {
      title: "Amazon",
      date: "Jun 2024 – Sep 2024",
      location: "Santa Clara, California",
      details:
        "Led the migration of Customer Experience rendering for headless price drop reorder notifications to Velociraptor, reducing rendering latency by 40% across all Alexa devices\nDesigned and implemented configuration-based rendering for single ASIN reorder notifications, successfully transitioning CX-presentation from Java to JSLT, accelerating the deployment process for 30+ partner teams",
    },
    {
      title: "Amazon",
      date: "May 2023 – Aug 2023",
      location: "Santa Clara, California",
      details:
        "Developed a sophisticated full-stack AI shopping assistant that enables customers to chat with over 20 million Amazon products, significantly enhancing the shopping experience through advanced interactive capabilities\nReduced large language model chunk parsing latency by 80% by designing and implementing a custom streamlined chunk processor, resulting in faster and more efficient data handling\nTrained the large language model to utilize Amazon’s comprehensive product catalog and external web information, enabling it to respond to customer inquiries about products, provide comparisons, and tailored recommendations",
    },
    {
      title: "Meta",
      date: "May 2022 – Aug 2022",
      location: "Menlo Park, California",
      details:
        "Designed and launched highly configurable timeline for Meta employees to manage daily work flow\nAchieved a 95% reduction in synchronization errors by implementing an advanced auto-syncing system for timeline and dashboard tasks, leveraging event triggers to ensure seamless data consistency and minimize manual updates.\nReceived rockstar rating, the highest performance rating given to the top 5% of interns",
    },
    {
      title: "PANS Lab",
      date: "Sep 2021 – Dec 2021",
      location: "Merced, California",
      details:
        "Undergraduate researcher in Dr. Shija Pan’s Pervasive Autonomous Networking Systems Lab\nDeveloped an Android application that monitors the gait of elderly individuals by connecting with structural vibration sensors via WiFi hotspot",
    },
    {
      title: "Curated.com",
      date: "Jun 2021 – Aug 2021",
      location: "San Francisco, California",
      details:
        "Implemented full stack infocard feature to improve the accuracy of information for 1000+ experts at Curated\nImplemented caching mechanism to optimize Slack api query volume from 250,000 to 2,000 per day, improving the communication between team managers and team experts",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">News</h1>
      <div className="space-y-8">
        {journeyItems.map((item, index) => (
          <div key={index} className="border-l-4 border-[#d79921] pl-4">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">
              {item.date} · {item.location}
            </p>
            <p className="mt-2">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
