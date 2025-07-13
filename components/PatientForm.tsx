import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Calendar, Activity, TriangleAlert as AlertTriangle, Save } from 'lucide-react-native';

interface PatientData {
  name: string;
  age: string;
  condition: string;
  hasTrach: boolean;
  trachSize: string;
  notes: string;
}

interface PatientFormProps {
  onSave: (patientData: PatientData) => void;
  onCancel: () => void;
  initialData?: Partial<PatientData>;
}

export default function PatientForm({ onSave, onCancel, initialData }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientData>({
    name: initialData?.name || '',
    age: initialData?.age || '',
    condition: initialData?.condition || '',
    hasTrach: initialData?.hasTrach || false,
    trachSize: initialData?.trachSize || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Partial<PatientData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PatientData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.condition.trim()) {
      newErrors.condition = 'Medical condition is required';
    }

    if (formData.hasTrach && !formData.trachSize.trim()) {
      newErrors.trachSize = 'Tracheostomy size is required when trach is present';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      Alert.alert(
        'Confirm Patient Information',
        'Please verify all patient information is accurate before proceeding with the scan.',
        [
          { text: 'Review', style: 'cancel' },
          { text: 'Confirm', onPress: () => onSave(formData) },
        ]
      );
    }
  };

  const updateField = (field: keyof PatientData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <User size={32} color="#2563EB" />
        <Text style={styles.title}>Patient Information</Text>
        <Text style={styles.subtitle}>
          Enter patient details for custom brace fitting
        </Text>
      </View>

      <View style={styles.form}>
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Enter patient's full name"
            placeholderTextColor="#9CA3AF"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Age Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            value={formData.age}
            onChangeText={(value) => updateField('age', value)}
            placeholder="Enter age"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            maxLength={3}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
        </View>

        {/* Medical Condition */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medical Condition *</Text>
          <TextInput
            style={[styles.input, errors.condition && styles.inputError]}
            value={formData.condition}
            onChangeText={(value) => updateField('condition', value)}
            placeholder="e.g., ALS, Cervical Support"
            placeholderTextColor="#9CA3AF"
          />
          {errors.condition && <Text style={styles.errorText}>{errors.condition}</Text>}
        </View>

        {/* Tracheostomy Section */}
        <View style={styles.trachSection}>
          <View style={styles.trachHeader}>
            <AlertTriangle size={20} color="#F59E0B" />
            <Text style={styles.trachTitle}>Tracheostomy Adaptations</Text>
          </View>
          
          <View style={styles.trachToggle}>
            <Text style={styles.toggleLabel}>Patient has tracheostomy</Text>
            <Switch
              value={formData.hasTrach}
              onValueChange={(value) => updateField('hasTrach', value)}
              trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
              thumbColor={formData.hasTrach ? '#2563EB' : '#9CA3AF'}
            />
          </View>

          {formData.hasTrach && (
            <View style={styles.trachDetails}>
              <Text style={styles.label}>Tracheostomy Tube Size *</Text>
              <TextInput
                style={[styles.input, errors.trachSize && styles.inputError]}
                value={formData.trachSize}
                onChangeText={(value) => updateField('trachSize', value)}
                placeholder="e.g., 8.0mm, Size 6"
                placeholderTextColor="#9CA3AF"
              />
              {errors.trachSize && <Text style={styles.errorText}>{errors.trachSize}</Text>}
              <Text style={styles.helperText}>
                This ensures proper clearance around the tracheostomy site
              </Text>
            </View>
          )}
        </View>

        {/* Notes Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(value) => updateField('notes', value)}
            placeholder="Any special considerations or requirements..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={styles.saveButtonGradient}
          >
            <Save size={18} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save & Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Privacy Notice */}
      <View style={styles.privacyNotice}>
        <Text style={styles.privacyText}>
          Patient data is encrypted and stored securely in compliance with GDPR regulations. 
          Data is only retained with explicit consent and for the duration necessary for brace creation.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  trachSection: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  trachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trachTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 8,
  },
  trachToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  trachDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  saveButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  privacyNotice: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
  },
  privacyText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    textAlign: 'center',
  },
});