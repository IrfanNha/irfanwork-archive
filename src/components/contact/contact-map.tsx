"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import { PERSONAL_INFO } from "@/constants/home";

export function ContactMap() {
  const handleOpenMaps = () => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(PERSONAL_INFO.location)}`,
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm"
    >
      {/* Map Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Our Location
            </h3>
            <p className="text-sm text-muted-foreground">
              Find us on the map or get directions
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenMaps}
            className="gap-2"
          >
            Open Maps
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative aspect-[21/9] bg-muted">
        {/* Replace this with actual map embed (Google Maps, Mapbox, etc.) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">
                {PERSONAL_INFO.location}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Get directions to my location
              </p>
              <Button onClick={handleOpenMaps} size="sm">
                View on Google Maps
              </Button>
            </div>
          </div>
        </div>

        {/* Optional: Uncomment to use Google Maps iframe */}
        {/* 
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.47434049757!2d110.3494!3d-6.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e0432b9da5cb9f2!2sSemarang%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
        */}
      </div>

      {/* Address Details */}
      <div className="p-6 bg-muted/30">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Address
            </p>
            <p className="text-sm font-semibold">
              {PERSONAL_INFO.contact.address}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Parking
            </p>
            <p className="text-sm font-semibold">
              Free parking available
              <br />
              Ground floor & basement
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Public Transport
            </p>
            <p className="text-sm font-semibold">
              Bus: Route 1A, 2B
              <br />5 mins walk from station
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
