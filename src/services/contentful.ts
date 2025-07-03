import { createClient } from 'contentful';

const client = createClient({
  space: "hwnypz7kg1s3",
  accessToken: "YSOYFk8SEtSgG_N3gPazLKiJKb00kF1G5xxK37ORXJk",
});

export const getResources = async (category?: string) => {
  try {
    let response;
    
    if (category) {
      // First try with resourceType filtering
      const resourceTypeQuery: any = {
        content_type: 'resource',
        order: ['-fields.featuredResource', '-fields.publishedDate'],
        limit: 100
      };
      
      switch (category) {
        case 'guides':
          resourceTypeQuery['fields.resourceType[in]'] = 'PDF Guide,Interactive Guide,Security Guide,Awareness Guide,Guide,Safety Guide,User Guide';
          break;
        case 'videos':
          resourceTypeQuery['fields.resourceType[in]'] = 'Emergency Guide Video,Tutorial Video,Educational Video,Video Tutorial,Video Guide,Training Video,Awareness Video,Video,Video Content,Instructional Video';
          break;
        case 'tools':
          resourceTypeQuery['fields.resourceType[in]'] = 'Web Tool,AI Tool,Assessment Tool,Tool,Digital Tool,Safety Tool,Interactive Tool';
          break;
        case 'podcasts':
          resourceTypeQuery['fields.resourceType[in]'] = 'Podcast Series,News Podcast,Educational Audio,Parental Guide,Podcast,Audio,Audio Content,Audio Guide';
          break;
      }
      
      response = await client.getEntries(resourceTypeQuery);
      
      // If no results with resourceType, try category field
      if (response.items.length === 0) {
        const categoryQuery: any = {
          content_type: 'resource',
          order: ['-fields.featuredResource', '-fields.publishedDate'],
          limit: 100,
          'fields.category': category
        };
        response = await client.getEntries(categoryQuery);
      }
    } else {
      // Get all resources
      response = await client.getEntries({
        content_type: 'resource',
        order: ['-fields.featuredResource', '-fields.publishedDate'],
        limit: 100
      });
    }
    
    console.log(`Fetched ${response.items.length} resources for category: ${category || 'all'}`);
    if (category === 'videos') {
      console.log('Video resources found:', response.items.map(item => ({
        title: item.fields.title,
        resourceType: item.fields.resourceType,
        category: item.fields.category
      })));
    }
    return response.items;
  } catch (error) {
    console.error('Error fetching resources from Contentful:', error);
    throw new Error(`Failed to fetch resources from Contentful: ${error}`);
  }
};

export const getLiveStreams = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'liveStream',
      order: ['-fields.isLive', '-fields.nextShowTime']
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching live streams from Contentful:', error);
    throw new Error(`Failed to fetch live streams from Contentful: ${error}`);
  }
};

export const getCommunityFeatures = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'communityFeature',
      order: ['fields.order']
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching community features from Contentful:', error);
    throw new Error(`Failed to fetch community features from Contentful: ${error}`);
  }
};

export const getQuickLinks = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'quickLink',
      order: ['fields.category', 'fields.order']
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching quick links from Contentful:', error);
    throw new Error(`Failed to fetch quick links from Contentful: ${error}`);
  }
};

export const getResourceStats = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'resourceStatistic',
      order: ['fields.order']
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching resource stats from Contentful:', error);
    throw new Error(`Failed to fetch resource stats from Contentful: ${error}`);
  }
};

export const getWorkshopEvents = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'workshopEvent',
      order: ['fields.eventDate', 'fields.displayOrder']
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching workshop events from Contentful:', error);
    throw new Error(`Failed to fetch workshop events from Contentful: ${error}`);
  }
};
