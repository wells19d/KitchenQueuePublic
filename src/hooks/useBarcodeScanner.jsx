//* useBarcodeScanner.jsx
import {useState, useRef} from 'react';
import {dailyCheckLimit} from '../utilities/checkLimit';
import {useDispatch} from 'react-redux';

const useBarcodeScanner = core => {
  const dispatch = useDispatch();
  const [showScanner, setShowScanner] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const lastScannedCode = useRef(null);

  const toggleTorch = () => setTorchEnabled(prev => !prev);

  const debounceRef = useRef(false);
  const count = core?.dailyUPCCounter || 0;
  const limit = core?.maxUPCSearchLimit || 0;

  const onReadCode = (codes = []) => {
    if (count < limit) {
      if (debounceRef.current) return;

      const supportedCodeFormats = ['ean-8', 'ean-13', 'upc-a', 'upc-e'];
      for (const code of codes) {
        const codeFormat = code.type?.toLowerCase();
        const codeValue = code.value;
        if (supportedCodeFormats.includes(codeFormat)) {
          if (lastScannedCode.current === codeValue) return;

          debounceRef.current = true;
          lastScannedCode.current = codeValue;

          const scannedCode = {format: codeFormat, value: codeValue};
          setScannedData(scannedCode);
          setShowScanner(false);

          setTimeout(() => {
            debounceRef.current = false;
          }, 1500);
          break;
        }
      }
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    lastScannedCode.current = null;
  };

  return {
    showScanner,
    setShowScanner,
    torchEnabled,
    toggleTorch,
    scannedData,
    onReadCode,
    resetScanner,
  };
};

export default useBarcodeScanner;
