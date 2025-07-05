import React,{ useState, useEffect } from "react"
import { fetchData } from "./api/fetchData"
import LoadingSpinner from "./components/LoadingSpinner"
import DatePickerModal from "./components/DatePickerModal"
import MissionDetailsModal from "./components/MissionDetailsModal"

// Custom Filter Icon Component (matching your design)
const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)

// Custom Calendar Icon Component
const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
)

// Custom Chevron Down Icon
const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)

// Custom Chevron Left Icon
const ChevronLeftIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
)

// Custom Chevron Right Icon
const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)

function App() {
  const [launch, setLaunch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Past 6 Months")
  const [selectedLaunchFilter, setSelectedLaunchFilter] = useState("All Launches")
  const [filteredLaunches, setFilteredLaunches] = useState([])

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        setLoading(true)
        const response = await fetchData()
        console.log("Real Crew-5 API Data:", response.data)
        setLaunch(response.data)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDataFromAPI()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    )
  }

  const getStatusBadge = (success, upcoming) => {
    if (upcoming) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          Upcoming
        </span>
      )
    }
    if (success) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          Success
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        Failed
      </span>
    )
  }

  const getLocationName = (launchpad) => {
    const launchpadNames = {
      "5e9e4502f509094188566f88": "KSC LC 39A",
      "5e9e4501f509094188566f87": "CCAFS SLC 40",
      "5e9e4502f509094188566f89": "Kwajalein Atoll",
    }
    return launchpadNames[launchpad] || "KSC LC 39A"
  }

  const getRocketName = (rocket) => {
    const rocketNames = {
      "5e9d0d95eda69973a809d1ec": "Falcon 9",
    }
    return rocketNames[rocket] || "Falcon 9"
  }

  const getOrbitType = (payloads) => {
    return "LEO"
  }

  const openModal = (launchItem) => {
    setSelectedLaunch(launchItem)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedLaunch(null)
    setIsModalOpen(false)
  }

  const openDatePicker = (launchItem) => {
    setSelectedLaunch(launchItem)
    setSelectedDate(new Date(launchItem.date_utc))
    setIsDatePickerOpen(true)
  }

  const closeDatePicker = () => {
    setIsDatePickerOpen(false)
    setSelectedLaunch(null)
  }

  const handleLaunchFilterChange = async (filterValue) => {
    setSelectedLaunchFilter(filterValue)
    setFilterLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Filter logic based on selection using allLaunches
    let filtered = []
    if (filterValue === "All Launches") {
      filtered = allLaunches
    } else if (filterValue === "Upcoming Launches") {
      filtered = allLaunches.filter((launch) => launch.upcoming)
    } else if (filterValue === "Successful Launches") {
      filtered = allLaunches.filter((launch) => launch.success === true)
    } else if (filterValue === "Failed Launches") {
      filtered = allLaunches.filter((launch) => launch.success === false)
    }

    setFilteredLaunches(filtered)
    setFilterLoading(false)
  }

  const handleTimePeriodChange = async (period) => {
    setSelectedTimePeriod(period)
    setFilterLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo, just show current data with real API priority
    setFilteredLaunches(allLaunches)
    setFilterLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAAgMu0buZwUQ3NPM0wtRAdG6Nin7jrE-tA&s"
                alt="SpaceX Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-gray-600">Loading launch data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading data: {error}</p>
        </div>
      </div>
    )
  }

  if (!launch) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No launch data available</p>
        </div>
      </div>
    )
  }

  // PRIORITIZE REAL CREW-5 API DATA - Create comprehensive launch object
  const realLaunchData = launch
    ? {
        id: launch.id || "crew-5-real",
        flight_number: launch.flight_number,
        name: launch.name,
        date_utc: launch.date_utc,
        date_local: launch.date_local,
        success: launch.success,
        upcoming: launch.upcoming,
        launchpad: launch.launchpad,
        rocket: launch.rocket,
        cores: launch.cores,
        crew: launch.crew,
        links: launch.links,
        details: launch.details,
        payloads: launch.payloads,
        capsules: launch.capsules,
        auto_update: launch.auto_update,
        static_fire_date_utc: launch.static_fire_date_utc,
        failures: launch.failures,
        net: launch.net,
        tbd: launch.tbd,
        launch_library_id: launch.launch_library_id,
      }
    : null

  // Create mock data array with REAL DATA FIRST
  const mockLaunches = [
    // REAL API DATA COMES FIRST
    ...(realLaunchData ? [realLaunchData] : []),
    // Static demo data for completeness
    {
      id: "static-1",
      flight_number: 1,
      name: "FalconSat",
      date_utc: "2006-03-24T22:30:00.000Z",
      success: false,
      upcoming: false,
      launchpad: "5e9e4502f509094188566f89",
      rocket: "5e9d0d95eda69973a809d1ec",
    },
    {
      id: "static-2",
      flight_number: 2,
      name: "RatSat",
      date_utc: "2008-09-28T23:15:00.000Z",
      success: true,
      upcoming: false,
      launchpad: "5e9e4502f509094188566f89",
      rocket: "5e9d0d95eda69973a809d1ec",
    },
    {
      id: "static-3",
      flight_number: 3,
      name: "Falcon 9 Test Flight",
      date_utc: "2010-06-04T18:45:00.000Z",
      success: true,
      upcoming: false,
      launchpad: "5e9e4501f509094188566f87",
      rocket: "5e9d0d95eda69973a809d1ec",
    },
    {
      id: "static-4",
      flight_number: 4,
      name: "CRS-21",
      date_utc: "2020-12-06T16:17:00.000Z",
      success: null,
      upcoming: true,
      launchpad: "5e9e4502f509094188566f88",
      rocket: "5e9d0d95eda69973a809d1ec",
    },
  ]

  // Define allLaunches for filtering
  const allLaunches = mockLaunches

  // Use filtered launches if available, otherwise use all launches with real data priority
  const displayLaunches = filteredLaunches.length > 0 ? filteredLaunches : allLaunches

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAAgMu0buZwUQ3NPM0wtRAdG6Nin7jrE-tA&s"
              alt="SpaceX Logo"
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedTimePeriod}
              onChange={(e) => handleTimePeriodChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pl-10 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
            >
              <option>Past 6 Months</option>
              <option>Past Year</option>
              <option>All Time</option>
            </select>
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedLaunchFilter}
              onChange={(e) => handleLaunchFilterChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pl-10 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
            >
              <option>All Launches</option>
              <option>Upcoming Launches</option>
              <option>Successful Launches</option>
              <option>Failed Launches</option>
            </select>
            <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Launched (UTC)
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orbit
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Launch Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rocket
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : displayLaunches.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <p className="text-gray-500 text-sm">No results found for the specified filter</p>
                  </td>
                </tr>
              ) : (
                displayLaunches.map((launchItem, index) => (
                  <tr key={launchItem.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td
                      className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => openDatePicker(launchItem)}
                    >
                      <span className="block sm:hidden">{formatDate(launchItem.date_utc).split(" at ")[0]}</span>
                      <span className="hidden sm:block">{formatDate(launchItem.date_utc)}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getLocationName(launchItem.launchpad)}
                    </td>
                    <td
                      className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => openModal(launchItem)}
                    >
                      {launchItem.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getOrbitType()}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(launchItem.success, launchItem.upcoming)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getRocketName(launchItem.rocket)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!filterLoading && displayLaunches.length > 0 && (
          <div className="flex items-center justify-center mt-6 space-x-2">
            <button className="p-2 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            <button className="px-3 py-2 rounded text-sm font-medium bg-blue-600 text-white">1</button>
            <button className="px-3 py-2 rounded text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
              2
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-2 rounded text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
              10
            </button>

            <button className="p-2 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Date Picker Modal Component */}
        <DatePickerModal
          isOpen={isDatePickerOpen}
          onClose={closeDatePicker}
          selectedLaunch={selectedLaunch}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimePeriod={selectedTimePeriod}
          setSelectedTimePeriod={setSelectedTimePeriod}
        />

        {/* Mission Details Modal Component */}
        <MissionDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedLaunch={selectedLaunch}
          launch={launch}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
          getLocationName={getLocationName}
          getRocketName={getRocketName}
        />
      </div>
    </div>
  )
}

export default App
