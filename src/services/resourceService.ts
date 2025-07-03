import { getResources as getContentfulResources, getLiveStreams, getResourceStats, getWorkshopEvents } from "./contentful";

// Types for our resource data
export interface ResourceItem {
  title: string;
  description: string;
  type: string;
  duration: string;
  level: string;
  downloads: string;
  featured: boolean;
  file?: any;
  thumbnail?: any;
  languages: string[];
  tags: string[];
  publishedDate?: string;
  instructor?: string;
  externalUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  category?: string;
  episodes?: number;
}

export interface ResourceCategory {
  title: string;
  description: string;
  icon: any;
  resources: ResourceItem[];
  liveStreams?: LiveStream[];
}

export interface LiveStream {
  title: string;
  description: string;
  isLive: boolean;
  listeners: string;
  languages: string[];
  schedule: string;
  nextShow: string;
  streamUrl: string;
  streamThumbnail?: string;
  category?: string;
  hostName?: string;
  tags?: string[];
}

export interface ResourcesData {
  guides: ResourceCategory;
  videos: ResourceCategory;
  tools: ResourceCategory;
  podcasts: ResourceCategory;
}

export interface ResourceStatistic {
  label: string;
  value: string;
  iconName: string;
  colorClass: string;
  displayOrder: number;
}

export interface WorkshopEvent {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'webinar' | 'training' | 'seminar' | 'conference';
  format: 'in-person' | 'online' | 'hybrid';
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  instructorTitle: string;
  capacity: number;
  registered: number;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  topics: string[];
  targetAudience: string[];
  language: string[];
  status: 'upcoming' | 'registration-open' | 'sold-out' | 'completed' | 'cancelled';
  featured: boolean;
  registrationUrl?: string;
  moreInfoUrl?: string;
  eventImage?: any;
  prerequisites?: string;
  materials?: string[];
  displayOrder?: number;
}

// Transform Contentful live stream data to our format
const transformContentfulLiveStream = (item: any): LiveStream => {
  const fields = item.fields || item;
  
  const getArrayValues = (field: any): string[] => {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? [field] : [];
  };

  const getSafeString = (value: any): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return '';
  };

  return {
    title: fields.streamTitle || fields.title || 'Untitled Stream',
    description: fields.streamDescription || fields.description || 'No description available',
    isLive: Boolean(fields.isLive || fields.currentlyLive || false),
    listeners: getSafeString(fields.currentListeners || fields.listeners || '0'),
    languages: getArrayValues(fields.availableLanguages || fields.languages || fields.streamLanguages),
    schedule: fields.schedule || fields.streamSchedule || fields.showSchedule || 'Schedule TBA',
    nextShow: fields.nextShowTime || fields.nextShow || fields.nextEpisode || 'TBA',
    streamUrl: fields.streamUrl || fields.liveStreamUrl || fields.url || '',
    streamThumbnail: fields.streamThumbnail || fields.thumbnail,
    category: fields.category || fields.streamCategory,
    hostName: fields.hostName || fields.host || fields.presenter,
    tags: getArrayValues(fields.tags || fields.streamTags)
  };
};

// Transform Contentful data to our format
const transformContentfulResource = (item: any): ResourceItem => {
  const fields = item.fields || item;
  
  // Handle array fields by taking first value or joining as needed
  const getArrayValue = (field: any) => {
    if (Array.isArray(field)) {
      return field.length > 0 ? field[0] : null;
    }
    return field;
  };

  const getArrayValues = (field: any): string[] => {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? [field] : [];
  };

  return {
    title: fields.title || 'Untitled',
    description: fields.description || 'No description available',
    type: getArrayValue(fields.resourceType) || 'Resource',
    duration: fields.durationreadTime || fields.duration || 'Unknown',
    level: fields.difficultyLevel || fields.level || 'All Levels',
    downloads: fields.downloadCount?.toString() || fields.downloads || '0',
    featured: fields.featuredResource || fields.featured || false,
    file: fields.file || fields.videoFile || fields.audioFile,
    thumbnail: fields.thumbnail || fields.thumbnailImage,
    languages: getArrayValues(fields.availableLanguages || fields.languages),
    tags: getArrayValues(fields.tags),
    publishedDate: fields.publishedDate,
    instructor: fields.instructor,
    externalUrl: fields.externalUrl,
    videoUrl: fields.videoUrl || (fields.videoFile?.fields?.file?.url) || fields.externalUrl,
    audioUrl: fields.audioUrl || (fields.audioFile?.fields?.file?.url),
    category: getArrayValue(fields.audioCategory) || fields.category,
    episodes: fields.episodeCount || 1
  };
};

// Transform Contentful resource statistic data to our format
const transformContentfulResourceStatistic = (item: any): ResourceStatistic => {
  const fields = item.fields || item;
  
  return {
    label: fields.label || 'Statistic',
    value: fields.value || '0',
    iconName: fields.iconName || 'BarChart',
    colorClass: fields.colorClass || 'text-blue-500',
    displayOrder: fields.displayOrder || fields.order || 1
  };
};

// Transform Contentful workshop event data to our format
const transformContentfulWorkshopEvent = (item: any): WorkshopEvent => {
  const fields = item.fields || item;
  
  const getArrayValues = (field: any): string[] => {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? [field] : [];
  };

  const getSafeNumber = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  return {
    id: item.sys?.id || '',
    title: fields.title || 'Untitled Event',
    description: fields.description || 'No description available',
    type: fields.eventType || 'workshop',
    format: fields.format || 'online',
    date: fields.eventDate || '',
    time: fields.startTime || '00:00',
    duration: fields.duration || 'TBA',
    location: fields.location || 'Online',
    instructor: fields.instructor || 'TBA',
    instructorTitle: fields.instructorTitle || '',
    capacity: getSafeNumber(fields.capacity),
    registered: getSafeNumber(fields.registeredCount),
    price: getSafeNumber(fields.price),
    level: fields.difficultyLevel || 'all-levels',
    topics: getArrayValues(fields.topics),
    targetAudience: getArrayValues(fields.targetAudience),
    language: getArrayValues(fields.languages),
    status: fields.status || 'upcoming',
    featured: Boolean(fields.featured),
    registrationUrl: fields.registrationUrl,
    moreInfoUrl: fields.moreInfoUrl,
    eventImage: fields.eventImage,
    prerequisites: fields.prerequisites,
    materials: getArrayValues(fields.materialsProvided),
    displayOrder: getSafeNumber(fields.displayOrder) || 1
  };
};

// Main function to fetch all resources
export const fetchAllResources = async (): Promise<ResourcesData> => {
  try {
    // Try to fetch from Contentful
    const [guides, videos, tools, podcasts, liveStreams] = await Promise.all([
      getContentfulResources('guides'),
      getContentfulResources('videos'),
      getContentfulResources('tools'),
      getContentfulResources('podcasts'),
      getLiveStreams()
    ]);

    // Transform Contentful data
    const transformedData: ResourcesData = {
      guides: {
        title: "Safety Guides",
        description: "Comprehensive guides to protect yourself online",
        icon: null,
        resources: guides.map(transformContentfulResource)
      },
      videos: {
        title: "Video Tutorials",
        description: "Step-by-step video guides and educational content",
        icon: null,
        resources: videos.map(transformContentfulResource)
      },
      tools: {
        title: "Safety Tools",
        description: "Interactive tools to enhance your digital security",
        icon: null,
        resources: tools.map(transformContentfulResource)
      },
      podcasts: {
        title: "Audio Content",
        description: "Podcasts and audio resources for on-the-go learning",
        icon: null,
        resources: podcasts.map(transformContentfulResource),
        liveStreams: liveStreams.map(transformContentfulLiveStream)
      }
    };

    return transformedData;
  } catch (error) {
    console.error('Failed to fetch from Contentful:', error);
    throw new Error('Unable to fetch resources from Contentful');
  }
};

// Function to fetch specific category
export const fetchResourcesByCategory = async (category: string): Promise<ResourceItem[]> => {
  try {
    const contentfulData = await getContentfulResources(category);
    return contentfulData.map(transformContentfulResource);
  } catch (error) {
    console.error(`Failed to fetch ${category} from Contentful:`, error);
    throw new Error(`Unable to fetch ${category} resources from Contentful`);
  }
};

// Function to get featured resources across all categories
export const getFeaturedResources = async (): Promise<ResourceItem[]> => {
  try {
    const allResources = await fetchAllResources();
    const featured: ResourceItem[] = [];
    
    Object.values(allResources).forEach(category => {
      if (category.resources) {
        featured.push(...category.resources.filter((resource: ResourceItem) => resource.featured));
      }
    });
    
    return featured.sort((a, b) => 
      new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime()
    );
  } catch (error) {
    console.error('Error fetching featured resources:', error);
    return [];
  }
};

// Function to search resources
export const searchResources = async (query: string): Promise<ResourceItem[]> => {
  try {
    const allResources = await fetchAllResources();
    const searchResults: ResourceItem[] = [];
    
    Object.values(allResources).forEach(category => {
      if (category.resources) {
        const filtered = category.resources.filter((resource: ResourceItem) =>
          resource.title.toLowerCase().includes(query.toLowerCase()) ||
          resource.description.toLowerCase().includes(query.toLowerCase()) ||
          resource.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        searchResults.push(...filtered);
      }
    });
    
    return searchResults;
  } catch (error) {
    console.error('Error searching resources:', error);
    return [];
  }
};

// Function to get resources by language
export const getResourcesByLanguage = async (language: string): Promise<ResourceItem[]> => {
  try {
    const allResources = await fetchAllResources();
    const languageResources: ResourceItem[] = [];
    
    Object.values(allResources).forEach(category => {
      if (category.resources) {
        const filtered: ResourceItem[] = category.resources.filter((resource: ResourceItem) =>
          resource.languages.includes(language)
        );
        languageResources.push(...filtered);
      }
    });
    
    return languageResources;
  } catch (error) {
    console.error('Error fetching resources by language:', error);
    return [];
  }
};

// Function to get all available languages
export const getAvailableLanguages = async (): Promise<string[]> => {
  try {
    const allResources = await fetchAllResources();
    const languages = new Set<string>();
    
    Object.values(allResources).forEach(category => {
      if (category.resources) {
        category.resources.forEach((resource: ResourceItem) => {
          resource.languages.forEach((lang: string) => languages.add(lang));
        });
      }
    });
    
    return Array.from(languages).sort();
  } catch (error) {
    console.error('Error fetching available languages:', error);
    throw new Error('Unable to fetch available languages from Contentful');
  }
};

// Function to fetch live streams specifically
export const fetchLiveStreams = async () => {
  try {
    const liveStreams = await getLiveStreams();
    return liveStreams.map(transformContentfulLiveStream);
  } catch (error) {
    console.error('Failed to fetch live streams from Contentful:', error);
    throw new Error('Unable to fetch live streams from Contentful');
  }
};

// Function to fetch resource statistics
export const fetchResourceStatistics = async (): Promise<ResourceStatistic[]> => {
  try {
    const contentfulStats = await getResourceStats();
    return contentfulStats
      .map(transformContentfulResourceStatistic)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.error('Failed to fetch resource statistics from Contentful:', error);
    throw new Error('Unable to fetch resource statistics from Contentful');
  }
};

// Function to fetch workshop events
export const fetchWorkshopEvents = async (): Promise<WorkshopEvent[]> => {
  try {
    const contentfulEvents = await getWorkshopEvents();
    return contentfulEvents
      .map(transformContentfulWorkshopEvent)
      .sort((a, b) => {
        // Sort by date first, then by display order
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }
        return (a.displayOrder || 0) - (b.displayOrder || 0);
      });
  } catch (error) {
    console.error('Failed to fetch workshop events from Contentful:', error);
    throw new Error('Unable to fetch workshop events from Contentful');
  }
};

export default {
  fetchAllResources,
  fetchResourcesByCategory,
  getFeaturedResources,
  searchResources,
  getResourcesByLanguage,
  getAvailableLanguages,
  fetchLiveStreams,
  fetchResourceStatistics,
  fetchWorkshopEvents
};
