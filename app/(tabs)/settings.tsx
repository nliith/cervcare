import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Smartphone, Globe, Heart, CircleHelp as HelpCircle, ChevronRight, Lock, Database, Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const settingSections = [
    {
      title: 'Patient Care',
      items: [
        {
          icon: Heart,
          title: 'Tracheostomy Settings',
          subtitle: 'Configure adaptations for trach patients',
          type: 'navigation',
          action: () => console.log('Trach settings'),
        },
        {
          icon: User,
          title: 'Default Patient Profile',
          subtitle: 'Set default measurements and preferences',
          type: 'navigation',
          action: () => console.log('Patient profile'),
        },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Shield,
          title: 'GDPR Compliance',
          subtitle: 'Data retention and consent settings',
          type: 'navigation',
          action: () => console.log('GDPR settings'),
        },
        {
          icon: Lock,
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face unlock',
          type: 'toggle',
          value: biometrics,
          onChange: setBiometrics,
        },
        {
          icon: Database,
          title: 'Data Backup',
          subtitle: 'Automatic secure backup to cloud',
          type: 'toggle',
          value: autoBackup,
          onChange: setAutoBackup,
        },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Scan updates and reminders',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Smartphone,
          title: 'Camera Settings',
          subtitle: 'Adjust scan quality and preferences',
          type: 'navigation',
          action: () => console.log('Camera settings'),
        },
        {
          icon: Globe,
          title: 'Language & Region',
          subtitle: 'English (US)',
          type: 'navigation',
          action: () => console.log('Language settings'),
        },
      ]
    },
    {
      title: 'Support & Legal',
      items: [
        {
          icon: HelpCircle,
          title: 'Help & Support',
          subtitle: 'Get help or contact support',
          type: 'navigation',
          action: () => console.log('Help'),
        },
        {
          icon: Globe,
          title: 'Partner Organizations',
          subtitle: 'Find local ALS support groups',
          type: 'navigation',
          action: () => console.log('Partners'),
        },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <SettingsIcon size={32} color="#2563EB" />
          <Text style={styles.titleText}>Settings</Text>
          <Text style={styles.subtitleText}>
            Customize your Cerv&Care experience
          </Text>
        </View>

        {/* Analytics Notice */}
        <View style={styles.analyticsSection}>
          <View style={styles.analyticsCard}>
            <View style={styles.analyticsHeader}>
              <Database size={20} color="#2563EB" />
              <Text style={styles.analyticsTitle}>Anonymous Usage Analytics</Text>
              <Switch
                value={analytics}
                onValueChange={setAnalytics}
                trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                thumbColor={analytics ? '#2563EB' : '#9CA3AF'}
              />
            </View>
            <Text style={styles.analyticsText}>
              Help improve our open-source platform by sharing anonymous usage data. 
              No personal health information is included.
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.sectionsContainer}>
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <TouchableOpacity 
                      key={itemIndex} 
                      style={[
                        styles.settingItem,
                        itemIndex === section.items.length - 1 && styles.settingItemLast
                      ]}
                      onPress={item.type === 'navigation' ? item.action : undefined}
                    >
                      <View style={styles.settingLeft}>
                        <View style={styles.settingIcon}>
                          <IconComponent size={20} color="#2563EB" />
                        </View>
                        <View style={styles.settingText}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.settingRight}>
                        {item.type === 'toggle' && (
                          <Switch
                            value={item.value}
                            onValueChange={item.onChange}
                            trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                            thumbColor={item.value ? '#2563EB' : '#9CA3AF'}
                          />
                        )}
                        {item.type === 'navigation' && (
                          <ChevronRight size={20} color="#9CA3AF" />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        {/* Data Management */}
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.dataItem}>
              <Database size={20} color="#059669" />
              <View style={styles.dataText}>
                <Text style={styles.dataTitle}>Export My Data</Text>
                <Text style={styles.dataSubtitle}>Download all your scan data</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.dataItem, styles.deleteItem]}>
              <Trash2 size={20} color="#DC2626" />
              <View style={styles.dataText}>
                <Text style={[styles.dataTitle, styles.deleteText]}>Delete All Data</Text>
                <Text style={styles.dataSubtitle}>Permanently remove all scan data</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Cerv&Care v1.0.0</Text>
          <Text style={styles.infoText}>
            Open source medical device fitting platform
          </Text>
          <Text style={styles.infoText}>
            Built with ❤️ for the ALS community
          </Text>
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
    marginTop: 12,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  analyticsSection: {
    padding: 24,
    paddingTop: 0,
  },
  analyticsCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  analyticsText: {
    fontSize: 14,
    color: '#2563EB',
    lineHeight: 20,
  },
  sectionsContainer: {
    padding: 24,
    paddingTop: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 16,
  },
  dataSection: {
    padding: 24,
    paddingTop: 0,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  deleteItem: {
    borderBottomWidth: 0,
  },
  dataText: {
    marginLeft: 16,
    flex: 1,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  deleteText: {
    color: '#DC2626',
  },
  dataSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  infoSection: {
    padding: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});