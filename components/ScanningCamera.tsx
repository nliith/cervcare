import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, RotateCw, Square, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface ScanningCameraProps {
  onScanComplete: (scanData: any) => void;
  onCancel: () => void;
}

export default function ScanningCamera({ onScanComplete, onCancel }: ScanningCameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentAngle, setCurrentAngle] = useState('Front view');
  const cameraRef = useRef<CameraView>(null);

  const scanAngles = [
    'Front view',
    'Left profile',
    'Right profile',
    'Back view'
  ];

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <AlertCircle size={48} color="#DC2626" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          We need camera access to capture 3D neck measurements for your custom brace fitting.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={styles.buttonGradient}
          >
            <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    let progress = 0;
    let angleIndex = 0;
    
    const scanInterval = setInterval(() => {
      progress += 25;
      setScanProgress(progress);
      
      if (angleIndex < scanAngles.length) {
        setCurrentAngle(scanAngles[angleIndex]);
        angleIndex++;
      }
      
      if (progress >= 100) {
        clearInterval(scanInterval);
        setIsScanning(false);
        onScanComplete({
          angles: scanAngles,
          timestamp: new Date().toISOString(),
          quality: 'high'
        });
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={onCancel}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>3D Neck Scan</Text>
          <TouchableOpacity style={styles.headerButton} onPress={toggleCameraFacing}>
            <RotateCw size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Scanning Overlay */}
        <View style={styles.scanningOverlay}>
          <View style={styles.scanFrame}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
            
            {isScanning && (
              <View style={styles.scanLine} />
            )}
          </View>
          
          <Text style={styles.instructionText}>
            {isScanning ? currentAngle : 'Position neck area within the frame'}
          </Text>
        </View>

        {/* Progress Indicator */}
        {isScanning && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${scanProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{scanProgress}% Complete</Text>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <View style={styles.controlsContainer}>
            {!isScanning ? (
              <>
                <View style={styles.sideSpacer} />
                <TouchableOpacity 
                  style={styles.captureButton}
                  onPress={startScanning}
                >
                  <LinearGradient
                    colors={['#3B82F6', '#2563EB']}
                    style={styles.captureGradient}
                  >
                    <Camera size={32} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
                <View style={styles.sideSpacer} />
              </>
            ) : (
              <>
                <View style={styles.sideSpacer} />
                <View style={styles.scanningIndicator}>
                  <View style={styles.scanningDot}>
                    <View style={styles.scanningDotInner} />
                  </View>
                  <Text style={styles.scanningText}>Scanning...</Text>
                </View>
                <View style={styles.sideSpacer} />
              </>
            )}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsPanel}>
          <View style={styles.instructionItem}>
            <Square size={16} color="#FFFFFF" />
            <Text style={styles.instructionItemText}>Keep device steady</Text>
          </View>
          <View style={styles.instructionItem}>
            <CheckCircle size={16} color="#FFFFFF" />
            <Text style={styles.instructionItemText}>Good lighting required</Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scanningOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3B82F6',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3B82F6',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3B82F6',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3B82F6',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#3B82F6',
    top: '50%',
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: 24,
    textAlign: 'center',
  },
  progressContainer: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
  controls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sideSpacer: {
    width: 60,
  },
  captureButton: {
    borderRadius: 40,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  captureGradient: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningIndicator: {
    alignItems: 'center',
  },
  scanningDot: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningDotInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
  },
  scanningText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: 8,
  },
  instructionsPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionItemText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
  },
});