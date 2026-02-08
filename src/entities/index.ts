/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: mindmapelements
 * Interface for MindmapElements
 */
export interface MindmapElements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  label?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  animationSpeed?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  sphereImage?: string;
  /** @wixFieldType url */
  linkUrl?: string;
}
