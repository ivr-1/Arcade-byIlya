import React, { useEffect } from 'react';
import { Box } from '@react-three/drei';

function SelectorBoxes({ setTargetMachine, targetMachine, cameraPosition, focusMachine, setMachineScreen, machineScreen }) {
  useEffect(() => {
    document.body.style.cursor = targetMachine !== 'initial' ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [targetMachine]);

  const handlePointerOver = (machine) => () => {
    if (cameraPosition === 'initial') {
      setTargetMachine(machine);
      setMachineScreen(prevState => ({
        ...prevState,
        [machine]: prevState[machine] === 'off' ? 'clickMe' : prevState[machine]
      }));
    }
  };

  const handlePointerOut = () => {
    if (cameraPosition === 'initial') {
      setTargetMachine('initial');
      setMachineScreen(prevState => {
        const newState = { ...prevState };
        Object.keys(newState).forEach(key => {
          if (newState[key] === 'clickMe') newState[key] = 'off';
        });
        return newState;
      });
    }
  };

  const handleClick = (machine) => () => {
    if (machineScreen[machine] === "clickMe") {
      focusMachine(machine);
      setMachineScreen(prevState => ({
        ...prevState,
        [machine]: 'active'
      }));
    }
  };

  return (
    <>
      {['left', 'center', 'right'].map((machine) => (
        <Box
          key={machine}
          position={machine === 'left' ? [-1.7, 1.5, -5] : machine === 'center' ? [-0.01, 1.5, -4.1] : [1.7, 1.5, -5]}
          args={machine === 'center' ? [0.75, 1.4, 1] : [1, 1.5, 1]}
          onPointerOver={handlePointerOver(machine)}
          onPointerOut={handlePointerOut}
          onClick={handleClick(machine)}
        >
          <meshStandardMaterial
            color="lightblue"
            opacity={0}
            transparent={true}
          />
        </Box>
      ))}
    </>
  );
}

export default SelectorBoxes;