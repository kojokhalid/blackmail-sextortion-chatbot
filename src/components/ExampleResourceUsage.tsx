// Example of how to use the new resource service in a component

import { useResourceManager, useLiveStreams, useResourceStatistics } from '@/hooks/useResources';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Radio, Users, Clock } from 'lucide-react';

const ExampleResourceComponent = () => {
  const {
    resources,
    loading,
    error,
    search,
    searchResults,
    searchLoading,
    clearSearch,
    getFeaturedFromAll
  } = useResourceManager();

  const { 
    liveStreams, 
    loading: liveStreamsLoading, 
    error: liveStreamsError 
  } = useLiveStreams();

  const {
    statistics: detailedStats,
    loading: statsLoading
  } = useResourceStatistics();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading resources...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const featuredResources = getFeaturedFromAll();

  return (
    <div className="space-y-8">
      {/* Live Streams Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Live Streams</h3>
        {liveStreamsLoading ? (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading live streams...
          </div>
        ) : liveStreamsError ? (
          <p className="text-destructive">Error loading live streams: {liveStreamsError}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream, index) => (
              <Card key={index} className="relative">
                {stream.isLive && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white animate-pulse">
                    <Radio className="w-3 h-3 mr-1" />
                    LIVE
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-sm">{stream.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{stream.description}</p>
                  {stream.hostName && (
                    <p className="text-xs">Host: {stream.hostName}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {stream.listeners}
                      </span>
                      {stream.category && (
                        <Badge variant="outline" className="text-xs">
                          {stream.category}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {stream.schedule}
                    </div>
                    {stream.tags && stream.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {stream.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Search Example */}
      <div>
        <input
          type="text"
          placeholder="Search resources..."
          onChange={(e) => {
            if (e.target.value) {
              search(e.target.value);
            } else {
              clearSearch();
            }
          }}
          className="w-full p-2 border rounded"
        />
        {searchLoading && <p>Searching...</p>}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3>Search Results ({searchResults.length})</h3>
            {searchResults.map((resource, index) => (
              <div key={index} className="p-2 border-b">
                {resource.title} - {resource.type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Resources */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredResources.slice(0, 6).map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{resource.type}</Badge>
                  {resource.featured && <Badge>Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {resource.duration}
                  </span>
                  <Button size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats from current data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{resources?.guides?.resources?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{resources?.videos?.resources?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Videos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{resources?.podcasts?.resources?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Podcasts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{featuredResources.length}</div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Statistics Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Resource Statistics</h3>
        {statsLoading ? (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading statistics...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {detailedStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.colorClass}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Debug Info (Remove in production) */}
      <details className="mt-8">
        <summary className="cursor-pointer text-sm text-muted-foreground">
          Debug: Resource Data Structure
        </summary>
        <pre className="text-xs bg-muted p-4 rounded mt-2 overflow-auto">
          {JSON.stringify(resources, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ExampleResourceComponent;
