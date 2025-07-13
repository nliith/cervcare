import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { User, Plus, Search, CreditCard as Edit3, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'scanning' | 'review' | 'approved' | 'delivered';
  lastUpdate: string;
  hasTrach: boolean;
}

export default function PatientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      age: 67,
      condition: 'ALS',
      status: 'review',
      lastUpdate: '2 hours ago',
      hasTrach: false,
    },
    {
      id: '2',
      name: 'Maria Garcia',
      age: 54,
      condition: 'Cervical Support',
      status: 'delivered',
      lastUpdate: '1 week ago',
      hasTrach: true,
    },
    {
      id: '3',
      name: 'Robert Johnson',
      age: 72,
      condition: 'ALS',
      status: 'approved',
      lastUpdate: '3 days ago',
      hasTrach: false,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scanning': return '#F59E0B';
      case 'review': return '#3B82F6';
      case 'approved': return '#059669';
      case 'delivered': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scanning': return Clock;
      case 'review': return AlertCircle;
      case 'approved': return CheckCircle;
      case 'delivered': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scanning': return 'In Progress';
      case 'review': return 'Under Review';
      case 'approved': return 'Approved for Print';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Patient Management</Text>
          <Text style={styles.subtitleText}>
            Track and manage neck brace fittings
          </Text>
        </View>

        {/* Search and Add */}
        <View style={styles.actionSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search patients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.addButtonGradient}
            >
              <Plus size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Patient List */}
        <View style={styles.patientSection}>
          <Text style={styles.sectionTitle}>
            Patients ({filteredPatients.length})
          </Text>
          
          {filteredPatients.map((patient) => {
            const StatusIcon = getStatusIcon(patient.status);
            return (
              <TouchableOpacity key={patient.id} style={styles.patientCard}>
                <View style={styles.patientHeader}>
                  <View style={styles.patientInfo}>
                    <View style={styles.patientAvatar}>
                      <User size={24} color="#2563EB" />
                    </View>
                    <View style={styles.patientDetails}>
                      <Text style={styles.patientName}>{patient.name}</Text>
                      <Text style={styles.patientMeta}>
                        Age {patient.age} • {patient.condition}
                        {patient.hasTrach && ' • Tracheostomy'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.editButton}>
                    <Edit3 size={18} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View style={styles.patientStatus}>
                  <View style={styles.statusContainer}>
                    <StatusIcon size={16} color={getStatusColor(patient.status)} />
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(patient.status) }
                    ]}>
                      {getStatusText(patient.status)}
                    </Text>
                  </View>
                  <Text style={styles.lastUpdate}>
                    Updated {patient.lastUpdate}
                  </Text>
                </View>

                {patient.status === 'review' && (
                  <View style={styles.actionRequired}>
                    <Text style={styles.actionText}>
                      Awaiting clinical review approval
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Total Patients</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>In Review</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
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
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  actionSection: {
    flexDirection: 'row',
    padding: 24,
    paddingTop: 0,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientSection: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  patientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientDetails: {
    marginLeft: 12,
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  patientMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  editButton: {
    padding: 8,
  },
  patientStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  lastUpdate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionRequired: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  actionText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
  statsSection: {
    padding: 24,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
});