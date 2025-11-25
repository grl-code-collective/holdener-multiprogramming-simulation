// Multiprogramming.js
import React, { useState } from 'react';
import CPUActivityChart from '../CPUActivityChart/CPUActivityChart';
import CPUPieChart from '../CPUPieChart/CPUPieChart';

const Multiprogramming = () => {
  const [numPrograms, setNumPrograms] = useState(5); // Number of programs
  const [cpuUtilization, setCpuUtilization] = useState(50); // CPU Utilization
  const [sameUtilization, setSameUtilization] = useState(true); // Radio Button State
  const [programTimes, setProgramTimes] = useState([]); // Random program times for varying utilization

  const handleRestart = () => {
    setNumPrograms(1); // Reset to the minimum number of programs
    setCpuUtilization(50); // Reset CPU utilization slider to 50%
    setSameUtilization(true); // Default to same utilization
    setProgramTimes([]); // Clear any program times
  };
  

  const handleStartSequence = () => {
    setProgramTimes([]); // Clear any previous program times
    setNumPrograms(0); // Start with zero programs
    let count = 0;

    const interval = setInterval(() => {
        if (count < numPrograms) {
            // Increment the number of programs one-by-one
            setNumPrograms((prev) => prev + 1);
            setProgramTimes((prevTimes) => generateProgramTimes(prevTimes.length + 1, cpuUtilization, sameUtilization)); 
            count++;
        } else {
            clearInterval(interval); // Stop once all programs are added
        }
    }, 2000); // 2-second delay between each addition
};

  
  

  // Handler for number of programs slider
  const handleNumProgramsChange = (e) => {
    setNumPrograms(Number(e.target.value));
    setProgramTimes(generateProgramTimes(Number(e.target.value), cpuUtilization, sameUtilization));
  };

  // Handler for CPU utilization slider
  const handleCpuUtilizationChange = (e) => {
    setCpuUtilization(Number(e.target.value));
    setProgramTimes(generateProgramTimes(numPrograms, Number(e.target.value), sameUtilization));
  };

  // Handler for radio buttons (same or varying utilization)
  const handleRadioChange = (e) => {
    const isSameUtilization = e.target.value === 'same';
    setSameUtilization(isSameUtilization);
    setProgramTimes(generateProgramTimes(numPrograms, cpuUtilization, isSameUtilization));
  };

  // Generate program times (either same or varying)
  const generateProgramTimes = (numPrograms, cpuUtilization, sameUtilization) => {
    return sameUtilization
      ? Array(numPrograms).fill(cpuUtilization / numPrograms)
      : Array.from({ length: numPrograms }, () => Math.random() * cpuUtilization);
  };
  
    return (
      <div className="multiprogramming-container">
        <h1>Multiprogramming Simulation</h1>
  
        {/* Radio Buttons */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="radio"
              value="same"
              checked={sameUtilization}
              onChange={handleRadioChange}
            />
            Same CPU Utilization for All Programs
          </label>
          <label style={{ marginLeft: '15px' }}>
            <input
              type="radio"
              value="varying"
              checked={!sameUtilization}
              onChange={handleRadioChange}
            />
            Varying CPU Utilization
          </label>
        </div>

        {/* Slider for CPU Utilization */}
        <div style={{ marginBottom: '15px' }}>
          <label>CPU Utilization: {cpuUtilization}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={cpuUtilization}
            onChange={handleCpuUtilizationChange}
            disabled={numPrograms === 0} // Disable until simulation starts
            style={{ marginLeft: '10px' }}
          />
        </div>

        {/* Slider for Number of Programs */}
        <div style={{ marginBottom: '15px' }}>
          <label>Number of Programs: {numPrograms}</label>
          <input
            type="range"
            min="1"
            max="25"
            value={numPrograms}
            onChange={handleNumProgramsChange}
            disabled={numPrograms === 0} // Disable until simulation starts
            style={{ marginLeft: '10px' }}
          />
        </div>

        {/* Buttons */}
      <button onClick={handleRestart} style={{ marginRight: '10px' }}>
        Restart Simulation
      </button>
      <button onClick={handleStartSequence}>Start Time Sequence</button>

  
        {/* Side-by-Side Graphs */}
        <div className="charts-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left: CPU Activity Chart */}
          <div className="chart" style={{ flex: 1, marginRight: '10px' }}>
            <CPUActivityChart numPrograms={numPrograms} cpuUtilization={cpuUtilization} sameUtilization={sameUtilization} programTimes={programTimes} />
          </div>
  
          {/* Right: Pie Chart for Overall CPU Utilization */}
          <div className="chart" style={{ flex: 1, marginLeft: '10px' }}>
            <CPUPieChart numPrograms={numPrograms} cpuUtilization={cpuUtilization} sameUtilization={sameUtilization} programTimes={programTimes}/>
          </div>
        </div>
      </div>
    );
  };
  
  
  export default Multiprogramming;