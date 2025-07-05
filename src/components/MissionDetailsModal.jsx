import React from "react"
const MissionDetailsModal = ({
  isOpen,
  onClose,
  selectedLaunch,
  launch,
  getStatusBadge,
  formatDate,
  getLocationName,
  getRocketName,
}) => {
  if (!isOpen || !selectedLaunch) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <img
                src={
                  selectedLaunch?.links?.patch?.small ||
                  launch?.links?.patch?.small ||
                  "/placeholder.svg?height=64&width=64" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
                }
                alt="Mission Patch"
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=64&width=64"
                }}
              />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">{selectedLaunch.name}</h2>
                {getStatusBadge(selectedLaunch.success, selectedLaunch.upcoming)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Falcon 9</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
            ×
          </button>
        </div>

        {/* Social Icons */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-4">
            <button className="text-gray-400 hover:text-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-red-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-4 border-b border-gray-200">
          <p className="text-gray-700 text-sm leading-relaxed">
            {selectedLaunch?.details ||
              launch?.details ||
              `${selectedLaunch.name} mission details. This mission was part of SpaceX's ongoing efforts to advance space exploration and technology.`}

            {/* Add Wikipedia link if available */}
            {(selectedLaunch?.links?.wikipedia || launch?.links?.wikipedia) && (
              <>
                {" "}
                <a
                  href={selectedLaunch?.links?.wikipedia || launch?.links?.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Wikipedia
                </a>
              </>
            )}
          </p>

          {/* Add YouTube webcast link if available */}
          {(selectedLaunch?.links?.webcast || launch?.links?.webcast) && (
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={selectedLaunch?.links?.webcast || launch?.links?.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors"
              >
                🎥 Watch Launch
              </a>

              {/* Add Reddit discussion link if available */}
              {(selectedLaunch?.links?.reddit?.launch || launch?.links?.reddit?.launch) && (
                <a
                  href={selectedLaunch?.links?.reddit?.launch || launch?.links?.reddit?.launch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-orange-600 text-white text-xs rounded-full hover:bg-orange-700 transition-colors"
                >
                  💬 Reddit Discussion
                </a>
              )}
            </div>
          )}
        </div>

        {/* Details Table */}
        <div className="px-6 py-4">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Flight Number</span>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedLaunch?.flight_number || launch?.flight_number || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Mission Name</span>
                <p className="text-sm text-gray-900 mt-1">{selectedLaunch?.name || launch?.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Launch Date (Local)</span>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedLaunch?.date_local || launch?.date_local
                    ? formatDate(selectedLaunch?.date_local || launch?.date_local)
                    : formatDate(selectedLaunch?.date_utc || launch?.date_utc)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Launch Site</span>
                <p className="text-sm text-gray-900 mt-1">
                  {getLocationName(selectedLaunch?.launchpad || launch?.launchpad)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Rocket Name</span>
                <p className="text-sm text-gray-900 mt-1">{getRocketName(selectedLaunch?.rocket || launch?.rocket)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Auto Update</span>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedLaunch?.auto_update || launch?.auto_update ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Core Information from API */}
            {(selectedLaunch?.cores || launch?.cores) &&
              (selectedLaunch?.cores?.length > 0 || launch?.cores?.length > 0) && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Landing Success</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedLaunch?.cores?.[0]?.landing_success || launch?.cores?.[0]?.landing_success
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Landing Type</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedLaunch?.cores?.[0]?.landing_type || launch?.cores?.[0]?.landing_type || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Core Reused</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedLaunch?.cores?.[0]?.reused || launch?.cores?.[0]?.reused ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Grid Fins</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedLaunch?.cores?.[0]?.gridfins || launch?.cores?.[0]?.gridfins ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Core Flight Number</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedLaunch?.cores?.[0]?.flight || launch?.cores?.[0]?.flight || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Landing Legs</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedLaunch?.cores?.[0]?.legs || launch?.cores?.[0]?.legs ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </>
              )}

            {/* Payload and Capsule Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Payloads</span>
                <p className="text-sm text-gray-900 mt-1">
                  {(selectedLaunch?.payloads || launch?.payloads)?.length || 0} payload(s)
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Capsules</span>
                <p className="text-sm text-gray-900 mt-1">
                  {(selectedLaunch?.capsules || launch?.capsules)?.length || 0} capsule(s)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Crew Information Section - PRIORITIZING REAL API DATA */}
        {(selectedLaunch?.crew || launch?.crew) && (selectedLaunch?.crew?.length > 0 || launch?.crew?.length > 0) && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Crew Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(selectedLaunch?.crew || launch?.crew)?.map((crewMember, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{crewMember.role}</p>
                  <p className="text-xs text-gray-500 mt-1">Crew ID: {crewMember.crew}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MissionDetailsModal
