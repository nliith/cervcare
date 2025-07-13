import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Scan, User, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Users } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.titleText}>Cerv&Care</Text>
          <Text style={styles.subtitleText}>
            Professional neck brace fitting made simple
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.primaryAction}
              onPress={() => router.push('/scan')}
            >
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.actionGradient}
              >
                <Scan size={32} color="#FFFFFF" />
                <Text style={styles.actionTitle}>Start New Scan</Text>
                <Text style={styles.actionSubtitle}>3D neck measurement</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryAction}
              onPress={() => router.push('/patients')}
            >
              <View style={styles.actionContent}>
                <User size={28} color="#2563EB" />
                <Text style={styles.secondaryActionTitle}>Manage Patients</Text>
                <Text style={styles.secondaryActionSubtitle}>View profiles</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.statusCards}>
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <Clock size={20} color="#F59E0B" />
                <Text style={styles.statusTitle}>In Review</Text>
              </View>
              <Text style={styles.statusNumber}>2</Text>
              <Text style={styles.statusSubtext}>Scans awaiting approval</Text>
            </View>

            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <CheckCircle size={20} color="#059669" />
                <Text style={styles.statusTitle}>Completed</Text>
              </View>
              <Text style={styles.statusNumber}>5</Text>
              <Text style={styles.statusSubtext}>Successful deliveries</Text>
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <View style={styles.supportCard}>
            <View style={styles.supportHeader}>
              <Users size={24} color="#2563EB" />
              <Text style={styles.supportTitle}>Need Assistance?</Text>
            </View>
            <Text style={styles.supportText}>
              Connect with local ALS organizations for in-person scanning support
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Find Local Partners</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <View style={styles.emergencyCard}>
            <AlertCircle size={20} color="#DC2626" />
            <Text style={styles.emergencyText}>
              For medical emergencies, contact your healthcare provider immediately
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
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionGrid: {
    gap: 16,
  },
  primaryAction: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionGradient: {
    padding: 24,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#DBEAFE',
    marginTop: 4,
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionContent: {
    alignItems: 'center',
  },
  secondaryActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  secondaryActionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusCards: {
    flexDirection: 'row',
    gap: 16,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  statusNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  supportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  supportText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencySection: {
    padding: 24,
    paddingTop: 0,
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyText: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});