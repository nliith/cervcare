import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Camera, Smartphone, Eye, CircleCheck as CheckCircle2, ArrowRight, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScanScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasLiDAR, setHasLiDAR] = useState(false);

  const scanSteps = [
    {
      title: 'Device Check',
      description: 'Verify camera and LiDAR capabilities',
      icon: Smartphone,
    },
    {
      title: 'Patient Setup',
      description: 'Position patient for optimal scanning',
      icon: Eye,
    },
    {
      title: '3D Scanning',
      description: 'Capture neck measurements',
      icon: Camera,
    },
    {
      title: 'Review & Submit',
      description: 'Verify scan quality and upload',
      icon: CheckCircle2,
    },
  ];

  const startScan = () => {
    Alert.alert(
      'Start 3D Scan',
      'This will access your camera to capture neck measurements. Ensure good lighting and a clear view of the patient\'s neck area.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => setCurrentStep(1) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titleText}>3D Neck Scanning</Text>
          <Text style={styles.subtitleText}>
            Professional-grade measurements using your smartphone
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            {scanSteps.map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <View style={[
                  styles.progressDot,
                  index <= currentStep && styles.progressDotActive
                ]}>
                  <Text style={[
                    styles.progressNumber,
                    index <= currentStep && styles.progressNumberActive
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                {index < scanSteps.length - 1 && (
                  <View style={[
                    styles.progressLine,
                    index < currentStep && styles.progressLineActive
                  ]} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Current Step Content */}
        <View style={styles.stepContent}>
          {currentStep === 0 && (
            <View style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <Smartphone size={32} color="#2563EB" />
                <Text style={styles.stepTitle}>Device Compatibility Check</Text>
              </View>
              
              <View style={styles.checkList}>
                <View style={styles.checkItem}>
                  <CheckCircle2 size={20} color="#059669" />
                  <Text style={styles.checkText}>Camera access available</Text>
                </View>
                <View style={styles.checkItem}>
                  <CheckCircle2 size={20} color="#059669" />
                  <Text style={styles.checkText}>Sufficient storage space</Text>
                </View>
                <View style={styles.checkItem}>
                  {hasLiDAR ? (
                    <CheckCircle2 size={20} color="#059669" />
                  ) : (
                    <AlertTriangle size={20} color="#F59E0B" />
                  )}
                  <Text style={styles.checkText}>
                    {hasLiDAR ? 'LiDAR available (enhanced accuracy)' : 'LiDAR not detected (standard mode)'}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  For best results, ensure good lighting and remove any clothing or accessories around the neck area.
                </Text>
              </View>
            </View>
          )}

          {currentStep === 1 && (
            <View style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <Eye size={32} color="#2563EB" />
                <Text style={styles.stepTitle}>Patient Positioning</Text>
              </View>
              
              <View style={styles.instructionList}>
                <Text style={styles.instructionTitle}>Setup Instructions:</Text>
                <Text style={styles.instructionItem}>• Patient should sit upright in good lighting</Text>
                <Text style={styles.instructionItem}>• Remove clothing from neck and shoulder area</Text>
                <Text style={styles.instructionItem}>• Hair should be tied back or held away from neck</Text>
                <Text style={styles.instructionItem}>• Patient should look straight ahead</Text>
                <Text style={styles.instructionItem}>• Ensure 2-3 feet distance from camera</Text>
              </View>

              <View style={styles.warningBox}>
                <AlertTriangle size={20} color="#DC2626" />
                <Text style={styles.warningText}>
                  Remove any medical devices or jewelry that might interfere with scanning
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {currentStep === 0 && (
            <TouchableOpacity style={styles.primaryButton} onPress={startScan}>
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.buttonGradient}
              >
                <Text style={styles.primaryButtonText}>Start Scanning Process</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {currentStep === 1 && (
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setCurrentStep(0)}
              >
                <Text style={styles.secondaryButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setCurrentStep(2)}
              >
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Begin 3D Scan</Text>
                  <Camera size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Safety Notice */}
        <View style={styles.safetySection}>
          <View style={styles.safetyCard}>
            <AlertTriangle size={20} color="#DC2626" />
            <Text style={styles.safetyText}>
              This app is for custom neck brace fitting only. For medical emergencies or urgent concerns, contact your healthcare provider immediately.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  progressSection: {
    padding: 24,
    paddingTop: 0,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDotActive: {
    backgroundColor: '#2563EB',
  },
  progressNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  progressNumberActive: {
    color: '#FFFFFF',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: '#2563EB',
  },
  stepContent: {
    padding: 24,
    paddingTop: 0,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
    textAlign: 'center',
  },
  checkList: {
    gap: 16,
    marginBottom: 20,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoText: {
    fontSize: 14,
    color: '#2563EB',
    lineHeight: 20,
  },
  instructionList: {
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 4,
  },
  warningBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  warningText: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    padding: 24,
    paddingTop: 0,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  safetySection: {
    padding: 24,
    paddingTop: 0,
  },
  safetyCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  safetyText: {
    fontSize: 12,
    color: '#DC2626',
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
});