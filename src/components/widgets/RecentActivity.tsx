export default function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Recent Activity</h3>
      <ul className="mt-2 text-gray-600">
        <li>
          ✅ Waste collected -{" "}
          <span className="font-semibold">Feb 14, 2025</span>
        </li>
        <li>
          ⚠️ Bin almost full -{" "}
          <span className="font-semibold">Feb 13, 2025</span>
        </li>
        <li>
          ✅ Waste collected -{" "}
          <span className="font-semibold">Feb 10, 2025</span>
        </li>
      </ul>
    </div>
  );
}
