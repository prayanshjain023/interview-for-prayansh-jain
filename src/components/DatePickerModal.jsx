import React,{ useState } from "react"

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

const DatePickerModal = ({
  isOpen,
  onClose,
  selectedLaunch,
  selectedDate,
  setSelectedDate,
  selectedTimePeriod,
  setSelectedTimePeriod,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const timePeriods = ["Past week", "Past month", "Past 3 months", "Past 6 months", "Past year", "Past 2 years"]

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  if (!isOpen || !selectedLaunch) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl h-[500px] overflow-hidden shadow-2xl">
        <div className="flex h-full flex-col sm:flex-row">
          {/* Left Sidebar - Time Period Options */}
          <div className="w-full sm:w-60 bg-gray-50 border-r border-gray-200 p-0">
            <div className="py-4">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimePeriod(period)}
                  className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors border-r-2 ${
                    selectedTimePeriod === period
                      ? "bg-white text-gray-900 border-blue-500"
                      : "text-gray-600 hover:bg-gray-100 border-transparent"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Calendar */}
          <div className="flex-1 p-6 bg-white overflow-y-auto">
            {/* Calendar Header with Navigation */}
            <div className="flex items-center justify-center mb-8 space-x-4 sm:space-x-12 flex-wrap">
              <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>

              {/* First Month */}
              <div className="flex items-center space-x-2">
                <select
                  value={monthNames[currentMonth.getMonth()]}
                  onChange={(e) => {
                    const newMonth = new Date(currentMonth)
                    newMonth.setMonth(monthNames.indexOf(e.target.value))
                    setCurrentMonth(newMonth)
                  }}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none cursor-pointer hover:bg-gray-50 px-2 py-1 rounded appearance-none"
                >
                  {monthNames.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />

                <select
                  value={currentMonth.getFullYear()}
                  onChange={(e) => {
                    const newMonth = new Date(currentMonth)
                    newMonth.setFullYear(Number.parseInt(e.target.value))
                    setCurrentMonth(newMonth)
                  }}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none cursor-pointer hover:bg-gray-50 px-2 py-1 rounded appearance-none"
                >
                  {Array.from({ length: 10 }, (_, i) => currentMonth.getFullYear() - 5 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Second Month */}
              <div className="flex items-center space-x-2">
                <select
                  value={monthNames[new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1).getMonth()]}
                  onChange={(e) => {
                    const newMonth = new Date(currentMonth)
                    newMonth.setMonth(monthNames.indexOf(e.target.value) - 1)
                    setCurrentMonth(newMonth)
                  }}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none cursor-pointer hover:bg-gray-50 px-2 py-1 rounded appearance-none"
                >
                  {monthNames.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />

                <select
                  value={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1).getFullYear()}
                  onChange={(e) => {
                    const newMonth = new Date(currentMonth)
                    newMonth.setFullYear(Number.parseInt(e.target.value))
                    setCurrentMonth(newMonth)
                  }}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none cursor-pointer hover:bg-gray-50 px-2 py-1 rounded appearance-none"
                >
                  {Array.from({ length: 10 }, (_, i) => currentMonth.getFullYear() - 5 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>

              <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Dual Calendar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* First Month Calendar */}
              <div>
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const displayMonth = new Date(currentMonth)
                    const daysInMonth = getDaysInMonth(displayMonth)
                    const firstDay = getFirstDayOfMonth(displayMonth)
                    const days = []

                    // Add empty cells for days before the first day of the month
                    for (let i = 0; i < firstDay; i++) {
                      days.push(<div key={`empty-${i}`} className="h-8"></div>)
                    }

                    // Add days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const isSelected =
                        selectedDate &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === displayMonth.getMonth() &&
                        selectedDate.getFullYear() === displayMonth.getFullYear()

                      days.push(
                        <button
                          key={day}
                          className={`h-8 w-8 text-sm rounded hover:bg-blue-50 transition-colors flex items-center justify-center ${
                            isSelected ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"
                          }`}
                          onClick={() => {
                            const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)
                            setSelectedDate(newDate)
                          }}
                        >
                          {day}
                        </button>,
                      )
                    }

                    return days
                  })()}
                </div>
              </div>

              {/* Second Month Calendar */}
              <div>
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                    const daysInMonth = getDaysInMonth(displayMonth)
                    const firstDay = getFirstDayOfMonth(displayMonth)
                    const days = []

                    // Add empty cells for days before the first day of the month
                    for (let i = 0; i < firstDay; i++) {
                      days.push(<div key={`empty-${i}`} className="h-8"></div>)
                    }

                    // Add days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const isSelected =
                        selectedDate &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === displayMonth.getMonth() &&
                        selectedDate.getFullYear() === displayMonth.getFullYear()

                      days.push(
                        <button
                          key={day}
                          className={`h-8 w-8 text-sm rounded hover:bg-blue-50 transition-colors flex items-center justify-center ${
                            isSelected ? "bg-blue-600 text-white" : "text-gray-700 hover:text-blue-600"
                          }`}
                          onClick={() => {
                            const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)
                            setSelectedDate(newDate)
                          }}
                        >
                          {day}
                        </button>,
                      )
                    }

                    return days
                  })()}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePickerModal
