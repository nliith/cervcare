import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BookOpen, Camera, Wrench, Heart, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, ChevronDown, ChevronRight, Info } from 'lucide-react-native';

interface GuideSection {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: GuideItem[];
}

interface GuideItem {
  title: string;
  content: string;
  important?: boolean;
}

export default function GuideScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>('scanning');

  const guideSections: GuideSection[] = [
    {
      id: 'scanning',
      title: 'Scanning Process',
      icon: Camera,
      color: '#2563EB',
      items: [
        {
          title: 'Before You Start',
          content: 'Ensure good lighting, remove neck accessories, and position patient 2-3 feet from camera. Have patient sit upright with shoulders relaxed.'
        },
        {
          title: 'Capturing the Scan',
          content: 'Move slowly around the patient, keeping the neck area centered. The app will guide you through each angle needed for a complete measurement.',
          important: true
        },
        {
          title: 'Quality Check',
          content: 'Review the 3D model for completeness. Retake if any areas appear distorted or missing. A quality scan ensures proper fit.'
        }
      ]
    },
    {
      id: 'assembly',
      title: 'Assembly Instructions',
      icon: Wrench,
      color: '#059669',
      items: [
        {
          title: 'Unboxing Your Brace',
          content: 'Your custom neck brace arrives in two main parts: the front panel and back panel, plus adjustment straps and padding inserts.'
        },
        {
          title: 'Initial Assembly',
          content: 'Connect the side hinges by aligning the posts with the receivers. You should hear a gentle click when properly connected.',
          important: true
        },
        {
          title: 'Padding Installation',
          content: 'Insert the soft padding into the designated slots. The padding should lay flat against the interior surface without bunching.'
        },
        {
          title: 'Strap Adjustment',
          content: 'Adjust straps for comfort. The brace should feel secure but not restrictive. You should be able to fit one finger under the strap.'
        }
      ]
    },
    {
      id: 'care',
      title: 'Daily Care & Usage',
      icon: Heart,
      color: '#EA580C',
      items: [
        {
          title: 'Wearing Schedule',
          content: 'Follow your healthcare provider\'s wearing schedule. Typically worn during waking hours with breaks every 2-3 hours for skin inspection.'
        },
        {
          title: 'Skin Care',
          content: 'Check skin daily for redness or irritation. Clean skin before wearing and keep skin dry. Report any persistent marks to your healthcare team.',
          important: true
        },
        {
          title: 'Cleaning Instructions',
          content: 'Clean with mild soap and warm water. Air dry completely before next use. Replace padding every 2-3 weeks or as needed.'
        },
        {
          title: 'When to Remove',
          content: 'Remove for sleeping unless instructed otherwise, during bathing, and if you experience severe discomfort or skin breakdown.'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <BookOpen size={32} color="#2563EB" />
          <Text style={styles.titleText}>User Guide</Text>
          <Text style={styles.subtitleText}>
            Step-by-step instructions for scanning, assembly, and care
          </Text>
        </View>

        {/* Quick Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipCard}>
            <Info size={20} color="#2563EB" />
            <Text style={styles.tipText}>
              Need help? Contact our support team or connect with local ALS organizations for in-person assistance.
            </Text>
          </View>
        </View>

        {/* Guide Sections */}
        <View style={styles.sectionsContainer}>
          {guideSections.map((section) => {
            const IconComponent = section.icon;
            const isExpanded = expandedSection === section.id;
            
            return (
              <View key={section.id} style={styles.sectionContainer}>
                <TouchableOpacity 
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <View style={styles.sectionHeaderLeft}>
                    <View style={[styles.sectionIcon, { backgroundColor: `${section.color}15` }]}>
                      <IconComponent size={24} color={section.color} />
                    </View>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  {isExpanded ? (
                    <ChevronDown size={20} color="#6B7280" />
                  ) : (
                    <ChevronRight size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.sectionContent}>
                    {section.items.map((item, index) => (
                      <View key={index} style={styles.guideItem}>
                        <View style={styles.guideItemHeader}>
                          <Text style={styles.guideItemTitle}>{item.title}</Text>
                          {item.important && (
                            <View style={styles.importantBadge}>
                              <AlertTriangle size={14} color="#DC2626" />
                              <Text style={styles.importantText}>Important</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.guideItemContent}>{item.content}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Safety Notice */}
        <View style={styles.safetySection}>
          <View style={styles.safetyCard}>
            <View style={styles.safetyHeader}>
              <AlertTriangle size={24} color="#DC2626" />
              <Text style={styles.safetyTitle}>Safety Reminders</Text>
            </View>
            <View style={styles.safetyList}>
              <View style={styles.safetyItem}>
                <CheckCircle size={16} color="#059669" />
                <Text style={styles.safetyText}>
                  Always follow your healthcare provider's instructions
                </Text>
              </View>
              <View style={styles.safetyItem}>
                <CheckCircle size={16} color="#059669" />
                <Text style={styles.safetyText}>
                  Report any persistent discomfort or skin issues immediately
                </Text>
              </View>
              <View style={styles.safetyItem}>
                <CheckCircle size={16} color="#059669" />
                <Text style={styles.safetyText}>
                  Keep emergency contact information readily available
                </Text>
              </View>
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
    marginTop: 12,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  tipsSection: {
    padding: 24,
    paddingTop: 0,
  },
  tipCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  tipText: {
    fontSize: 14,
    color: '#2563EB',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  sectionsContainer: {
    padding: 24,
    paddingTop: 0,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 16,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  guideItem: {
    marginBottom: 20,
  },
  guideItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  guideItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  importantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  importantText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#DC2626',
    marginLeft: 4,
  },
  guideItemContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  safetySection: {
    padding: 24,
    paddingTop: 0,
  },
  safetyCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 12,
  },
  safetyList: {
    gap: 12,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  safetyText: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});