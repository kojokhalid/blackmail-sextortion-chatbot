import { useState, useEffect } from 'react';
import { 
  fetchAllResources, 
  fetchResourcesByCategory, 
  getFeaturedResources,
  searchResources,
  getResourcesByLanguage,
  getAvailableLanguages,
  type ResourcesData,
  type ResourceItem,
  type LiveStream,
  type ResourceStatistic,
  type WorkshopEvent
} from '@/services/resourceService';

// Hook for fetching all resources
export const useResources = () => {
  const [resources, setResources] = useState<ResourcesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllResources();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();

    // Auto-refresh every 30 seconds (for testing - should be 5 minutes in production)
    const interval = setInterval(refetch, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { resources, loading, error, refetch };
};

// Hook for fetching resources by category
export const useResourcesByCategory = (category: string) => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchResourcesByCategory(category);
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch ${category} resources`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      refetch();
    }
  }, [category]);

  return { resources, loading, error, refetch };
};

// Hook for fetching featured resources
export const useFeaturedResources = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFeaturedResources();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { resources, loading, error, refetch };
};

// Hook for searching resources
export const useResourceSearch = () => {
  const [results, setResults] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchResources(query);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setError(null);
  };

  return { results, loading, error, search, clearSearch };
};

// Hook for resources by language
export const useResourcesByLanguage = (language: string) => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getResourcesByLanguage(language);
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch ${language} resources`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (language) {
      refetch();
    }
  }, [language]);

  return { resources, loading, error, refetch };
};

// Hook for available languages
export const useAvailableLanguages = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAvailableLanguages();
      setLanguages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch available languages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { languages, loading, error, refetch };
};

// Combined hook for resource management (most commonly used)
export const useResourceManager = () => {
  const { resources, loading, error, refetch } = useResources();
  const { search, results: searchResults, loading: searchLoading, clearSearch } = useResourceSearch();
  const { languages } = useAvailableLanguages();
  const { statistics } = useResourceStatistics();

  // Helper function to get resources by category
  const getResourcesByCategory = (category: keyof ResourcesData) => {
    return resources?.[category]?.resources || [];
  };

  // Helper function to get featured resources from all categories
  const getFeaturedFromAll = () => {
    if (!resources) return [];
    
    const featured: ResourceItem[] = [];
    Object.values(resources).forEach(category => {
      if (category.resources) {
        featured.push(...category.resources.filter((resource: ResourceItem) => resource.featured));
      }
    });
    
    return featured.sort((a, b) => 
      new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime()
    );
  };

  return {
    // Core data
    resources,
    loading,
    error,
    refetch,
    
    // Search functionality
    search,
    searchResults,
    searchLoading,
    clearSearch,
    
    // Available languages
    languages,
    
    // Resource statistics
    statistics,
    
    // Helper functions
    getResourcesByCategory,
    getFeaturedFromAll,
    
    // Quick access to categories
    guides: resources?.guides?.resources || [],
    videos: resources?.videos?.resources || [],
    tools: resources?.tools?.resources || [],
    podcasts: resources?.podcasts?.resources || [],
    liveStreams: resources?.podcasts?.liveStreams || []
  };
};

// Hook for fetching live streams specifically
export const useLiveStreams = () => {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const { fetchLiveStreams } = await import('@/services/resourceService');
      const data = await fetchLiveStreams();
      setLiveStreams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live streams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();

    // Auto-refresh every 2 minutes for live streams
    const interval = setInterval(refetch, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { liveStreams, loading, error, refetch };
};

// Hook for fetching resource statistics
export const useResourceStatistics = () => {
  const [statistics, setStatistics] = useState<ResourceStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const { fetchResourceStatistics } = await import('@/services/resourceService');
      const data = await fetchResourceStatistics();
      setStatistics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resource statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { statistics, loading, error, refetch };
};

// Hook for fetching workshop events
export const useWorkshopEvents = () => {
  const [events, setEvents] = useState<WorkshopEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const { fetchWorkshopEvents } = await import('@/services/resourceService');
      const data = await fetchWorkshopEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workshop events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { events, loading, error, refetch };
};

export default useResourceManager;
