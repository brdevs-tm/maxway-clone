import React, { useState, Fragment } from "react";
import branches from "../constants/branches";
import YandexMap from "../components/YandexMap";

const BranchesPage = () => {
  document.title = "Branches";
  const [activeView, setActiveView] = useState("branches");

  const getStatus = (startHour, endHour) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const startTime = new Date(`${today}T${startHour}:00`);
    const endTime = new Date(`${today}T${endHour}:00`);

    if (endHour <= startHour) {
      endTime.setDate(endTime.getDate() + 1);
    }

    if (now >= startTime && now <= endTime) {
      return {
        message: `Now open to ${endHour}`,
        color: "green",
      };
    } else {
      let nextOpenTime =
        now < startTime
          ? startTime
          : new Date(`${today}T${startHour}:00`).setDate(
              startTime.getDate() + 1
            );
      let hoursUntilOpen = Math.ceil((nextOpenTime - now) / (1000 * 60 * 60));
      return {
        message: `Closed, opens in ${hoursUntilOpen} hour(s) at ${startHour}`,
        color: "red",
      };
    }
  };

  return (
    <Fragment>
      <div className="containerown pt-40">
        <h1 className="text-2xl font-bold mb-4">Branches</h1>
        <div className="flex items-center justify-between gap-5 mb-4">
          <button
            className={`border shadow-md p-4 rounded-[25px] ${
              activeView === "branches"
                ? "bg-main-purple text-white"
                : "border-white"
            }`}
            onClick={() => setActiveView("branches")}
          >
            Branches
          </button>
          <button
            className={`border shadow-md p-4 rounded-[25px] ${
              activeView === "map"
                ? "bg-main-purple text-white"
                : "border-white"
            }`}
            onClick={() => setActiveView("map")}
          >
            Map
          </button>
        </div>
        {activeView === "branches" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((branch) => {
              const status = getStatus(branch.startHour, branch.endHour);
              return (
                <div
                  key={branch.id}
                  className="flex flex-col gap-3 mb-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {branch.branchAddress}
                      </h2>
                      <p>{branch.fullAddress}</p>
                    </div>
                    <div>
                      <p style={{ color: status.color }}>{status.message}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mb-1">
                        Operating Days: {branch.startDay} - {branch.endDay}
                      </p>
                      <p className="mb-1">
                        Operating Hours: {branch.startHour} - {branch.endHour}
                      </p>
                    </div>
                    <div></div>
                    <div className="flex flex-col items-end">
                      <span>Phone: </span>
                      <a href={`tel:${branch.phoneNumber.replace(/ /g, "")}`}>
                        {branch.phoneNumber}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeView === "map" && <YandexMap />}
      </div>
    </Fragment>
  );
};

export default BranchesPage;
