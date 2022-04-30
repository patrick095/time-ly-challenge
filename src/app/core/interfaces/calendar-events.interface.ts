export interface Small {
    width: number;
    url: string;
    height: number;
}

export interface Thumbnail {
    width: number;
    url: string;
    height: number;
}

export interface Medium {
    width: number;
    url: string;
    height: number;
}

export interface Small2 {
    width?: number;
    url: string;
    height?: number;
}

export interface Thumbnail2 {
    width?: number;
    url: string;
    height?: number;
}

export interface Medium2 {
    width?: number;
    url: string;
    height?: number;
}

export interface Full {
    width?: number;
    url: string;
    height?: number;
}

export interface Sizes {
    small: Small2;
    thumbnail: Thumbnail2;
    medium: Medium2;
    full: Full;
}

export interface Full2 {
    width: number;
    url: string;
    height: number;
}

export interface Image {
    small: Small;
    thumbnail: Thumbnail;
    reference_id: number;
    file_name: string;
    created_at: string;
    medium: Medium;
    title: string;
    deleted_at?: any;
    file_size: number;
    sizes: Sizes;
    updated_at: string;
    file_hash: string;
    mime_type: string;
    user_id: number;
    id?: number;
    full: Full2;
}

export interface TaxonomyVenue {
    country: string;
    image?: any;
    website?: any;
    address: string;
    geo_location: string;
    reference_id: number;
    address2?: any;
    city: string;
    item_type: string;
    phone2?: any;
    created_at: string;
    title: string;
    deleted_at?: any;
    country_first_division: string;
    updated_at: string;
    phone?: any;
    venue_type: string;
    id: number;
    image_id?: any;
    postal_code: string;
    email?: any;
    place_id?: any;
}

export interface Pivot {
    taxonomy_id: string;
    event_id: string;
}

export interface Datum {
    image?: any;
    reference_id: number;
    color?: any;
    updated_at: string;
    item_type: string;
    created_at: string;
    pivot: Pivot;
    id: number;
    image_id?: any;
    title: string;
    deleted_at?: any;
    filter_group_id: number;
}

export interface TaxonomyFilterGroup {
    reference_id: number;
    color?: any;
    updated_at: string;
    data: Datum[];
    item_type: string;
    created_at: string;
    id: number;
    title: string;
    deleted_at?: any;
}

export interface Pivot2 {
    taxonomy_id: string;
    event_id: string;
}

export interface TaxonomyCategory {
    image?: any;
    reference_id: number;
    color?: any;
    updated_at: string;
    item_type: string;
    created_at: string;
    pivot: Pivot2;
    id: number;
    image_id?: any;
    title: string;
    deleted_at?: any;
    filter_group_id?: any;
}

export interface Taxonomies {
    taxonomy_venue: TaxonomyVenue[];
    taxonomy_filter_group: TaxonomyFilterGroup[];
    taxonomy_category: TaxonomyCategory[];
}

export interface CalendarEventTimelyInterface {
    ticket_type: string;
    cost_display: string;
    featured: boolean;
    instance: string;
    start_datetime: string;
    end_datetime: string;
    cost_type?: any;
    timezone: string;
    post_to_facebook: boolean;
    title: string;
    is_example_event: boolean;
    feed_id?: number;
    uid: string;
    id: number;
    event_status: string;
    custom_url: string;
    tickets_count: number;
    images: Image[];
    cost?: any;
    cost_external_url?: any;
    calendar_id: number;
    post_to_twitter: boolean;
    tickets_min_price?: any;
    tickets_currency_symbol?: any;
    tickets_currency?: any;
    allday: boolean;
    description_short: string;
    taxonomies: Taxonomies;
    user: string;
    url: string;
    canonical_url: string;
}

export interface Data {
    total: number;
    from: number;
    size: number;
    has_prior: boolean;
    has_next: boolean;
    items: CalendarEventTimelyInterface[];
}

export interface CalendarEventsInterface {
    data: Data;
}

export interface CalendarEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
    description?: string;
    shortDescription?: string;
    images?: Image[];
    shareLink?: string;
}

export interface EventColor {
    primary: string;
    secondary: string;
}
export interface EventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent }: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): any;
}
