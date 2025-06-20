'use client';

import { useCallback } from 'react';
import { sendGTMEvent, GTMEvents, GTMEvent } from '@/app/lib/gtm';

export const useGTM = () => {
  const trackEvent = useCallback((event: GTMEvent) => {
    sendGTMEvent(event);
  }, []);

  const trackPageView = useCallback((pageName: string, pageCategory?: string) => {
    trackEvent(GTMEvents.pageView(pageName, pageCategory));
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackEvent(GTMEvents.clickButton(buttonName, location));
  }, [trackEvent]);

  const trackFormStart = useCallback((formName: string) => {
    trackEvent(GTMEvents.formStart(formName));
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formName: string, formData?: Record<string, string | number | boolean>) => {
    trackEvent(GTMEvents.formSubmit(formName, formData));
  }, [trackEvent]);

  const trackNewsletterSubscribe = useCallback((email: string, location: string) => {
    trackEvent(GTMEvents.newsletterSubscribe(email, location));
  }, [trackEvent]);

  const trackContactClick = useCallback((contactType: 'whatsapp' | 'email' | 'phone', location: string) => {
    trackEvent(GTMEvents.contactClick(contactType, location));
  }, [trackEvent]);

  const trackBlogPostView = useCallback((postTitle: string, postCategory: string, postAuthor: string) => {
    trackEvent(GTMEvents.blogPostView(postTitle, postCategory, postAuthor));
  }, [trackEvent]);

  const trackBlogPostShare = useCallback((postTitle: string, shareMethod: string) => {
    trackEvent(GTMEvents.blogPostShare(postTitle, shareMethod));
  }, [trackEvent]);

  const trackAssociationStart = useCallback(() => {
    trackEvent(GTMEvents.associationStart());
  }, [trackEvent]);

  const trackAssociationComplete = useCallback((membershipType: string) => {
    trackEvent(GTMEvents.associationComplete(membershipType));
  }, [trackEvent]);

  const trackProductView = useCallback((productName: string, productCategory: string) => {
    trackEvent(GTMEvents.productView(productName, productCategory));
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormStart,
    trackFormSubmit,
    trackNewsletterSubscribe,
    trackContactClick,
    trackBlogPostView,
    trackBlogPostShare,
    trackAssociationStart,
    trackAssociationComplete,
    trackProductView,
  };
}; 