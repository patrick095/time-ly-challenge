export interface Colors {
    text?: any;
    links?: any;
    linksHover?: any;
    background?: any;
    eventBackground?: any;
    eventBorder?: any;
    border?: any;
    primaryButtonBackground?: any;
    primaryButtonText?: any;
    primaryButtonBorder?: any;
    secondaryButtonBackground?: any;
    secondaryButtonText?: any;
    secondaryButtonBorder?: any;
    ctaButtonBackground?: any;
    ctaButtonText?: any;
    ctaButtonBorder?: any;
    eventTitle?: any;
    eventTitleDate?: any;
    eventTitleBackground?: any;
    eventTitleBorder?: any;
    eventActionsIcons?: any;
    eventActionsBackground?: any;
    eventActionsBorder?: any;
    eventSharingBackground?: any;
    eventTabHover?: any;
    eventTabFont?: any;
    eventDetailsText?: any;
    eventDetailsLink?: any;
    eventDetailsBackground?: any;
    eventDescriptionBackground?: any;
    eventDescriptionText?: any;
    eventDescriptionTitle?: any;
    eventDetailsBorder?: any;
    posterboardBackground?: any;
    posterboardBackgroundHover?: any;
    posterboardBorder?: any;
    posterboardTitle?: any;
    posterboardTime?: any;
    posterboardExcerpt?: any;
    posterboardImageBackground?: any;
    posterboardDateBackground?: any;
    posterboardDateText?: any;
    posterboardEventFeaturedText?: any;
    posterboardEventFeaturedBackground?: any;
    tileBackground?: any;
    tileBackgroundHover?: any;
    tileBorder?: any;
    tileTitle?: any;
    tileTime?: any;
    tileExcerpt?: any;
    tileImageBackground?: any;
    tileDateBackground?: any;
    tileDateText?: any;
    tileEventFeaturedText?: any;
    tileEventFeaturedBackground?: any;
    streamViewDateDividerBackground?: any;
    streamViewDateDividerText?: any;
    streamViewEventBackground?: any;
    streamViewEventBackgroundHover?: any;
    streamViewEventBorder?: any;
    streamViewEventTitle?: any;
    streamViewEventTime?: any;
    streamViewEventExcerpt?: any;
    streamViewEventImageBackground?: any;
    streamViewEventFeaturedText?: any;
    streamViewEventFeaturedBackground?: any;
    agendaBackground?: any;
    agendaBackgroundHover?: any;
    agendaBorder?: any;
    agendaTitle?: any;
    agendaTime?: any;
    agendaExcerpt?: any;
    agendaDateMonthBackground?: any;
    agendaDateBackground?: any;
    agendaDateText?: any;
    agendaDayPrimaryBackground?: any;
    agendaDaySecondaryBackground?: any;
    agendaDayBorder?: any;
    agendaEventFeaturedText?: any;
    agendaEventFeaturedBackground?: any;
    yearMonthBackground?: any;
    yearMonthText?: any;
    yearWeekdayBackground?: any;
    yearWeekdayText?: any;
    yearDayBackground?: any;
    yearDayText?: any;
    yearTodayBackground?: any;
    yearDayActiveBackground?: any;
    yearDayActiveText?: any;
    yearPopupBackground?: any;
    yearPopupText?: any;
    yearEventFeaturedText?: any;
    monthThHeaderBackground?: any;
    monthThHeaderText?: any;
    monthEventHeaderBackground?: any;
    monthMobileEventHeaderBackground?: any;
    monthEventHeaderText?: any;
    monthMobileEventHeaderText?: any;
    monthMobileEventCountBackground?: any;
    monthMobileEventCountText?: any;
    monthPopupBackground?: any;
    monthPopupImageBackground?: any;
    monthPopupText?: any;
    monthMultiDaySectionBackground?: any;
    monthMultiDayBackground?: any;
    monthMultiDay?: any;
    monthDayBackground?: any;
    monthDayText?: any;
    monthTodayBackground?: any;
    monthMobileDayActiveBackground?: any;
    monthEventFeaturedText?: any;
    monthEventFeaturedBackground?: any;
    weekThHeaderBackground?: any;
    weekThHeaderText?: any;
    weekDailyBorder?: any;
    weekHourlyText?: any;
    weekMultiDayBackground?: any;
    weekMultiDay?: any;
    weekEventTitle?: any;
    weekEventDate?: any;
    weekEventPrimaryBackground?: any;
    weekEventSecondaryBackground?: any;
    weekBorder?: any;
    weekEventBoxShadow?: any;
    weekEventDetails?: any;
    weekTodayBackground?: any;
    weekTodayColor?: any;
    weekEventFeaturedText?: any;
    weekEventFeaturedBackground?: any;
    sliderBackgroundPrimary?: any;
    sliderBackgroundSecondary?: any;
    sliderHoverBackgroundPrimary?: any;
    sliderHoverBackgroundSecondary?: any;
    sliderEventDate?: any;
    sliderEventDateHover?: any;
    sliderEventDateBackground?: any;
    sliderEventTime?: any;
    sliderEventTimeHover?: any;
    sliderEventDetails?: any;
    sliderEventDetailsHover?: any;
    sliderControls?: any;
    sliderItemIndicator?: any;
    sliderItemIndicatorActive?: any;
    sliderEventFeaturedText?: any;
    sliderEventFeaturedBackground?: any;
    carouselBackgroundPrimary?: any;
    carouselBackgroundSecondary?: any;
    carouselEventDate?: any;
    carouselEventDateDayBackground?: any;
    carouselEventDateDayMonthBackground?: any;
    carouselEventTime?: any;
    carouselEventDetails?: any;
    carouselControls?: any;
    carouselItemIndicator?: any;
    carouselItemIndicatorActive?: any;
    carouselEventFeaturedText?: any;
    carouselEventFeaturedBackground?: any;
    modernListViewBackground?: any;
    modernListViewTitle?: any;
    modernListViewBorder?: any;
    modernListViewTime?: any;
    modernListViewExcerpt?: any;
    modernListViewPrice?: any;
    modernListViewImageBackground?: any;
    modernListViewEventFeaturedText?: any;
    modernListViewEventFeaturedBackground?: any;
}

export interface Theme {
    name: string;
    font?: any;
    fontUrl?: any;
    titleFont?: any;
    sliderFont?: any;
    colors: Colors;
}

export interface DesignCustomizations {
    theme: Theme;
    active_theme: string;
    event_page_layout: string;
    metadata?: any;
    header?: any;
    footer?: any;
    custom_css?: any;
    embed_metadata_customization: boolean;
    embed_section_customization: boolean;
    embed_custom_css_customization: boolean;
    embed_metadata?: any;
    embed_header?: any;
    embed_footer?: any;
    embed_custom_css?: any;
}

export interface GoogleAnalytics {
    enabled: boolean;
    script?: any;
}

export interface Disclaimer {
    enabled: boolean;
    text?: any;
    required: boolean;
}

export interface Fes {
    enabled: boolean;
    auto_approve_fes: boolean;
    auto_approve_events: boolean;
    hide_fes_btn: boolean;
    require_signin: boolean;
    disclaimer: Disclaimer;
    filters: any[];
    custom_fields: any[];
    external_tickets: boolean;
    featured_image_required: boolean;
}

export interface Date {
    delimiter: string;
    format: string;
    include_year: boolean;
    setting: string;
    week_start?: any;
}

export interface Time {
    format: string;
    include_timezone: boolean;
    military: boolean;
    timezone: string;
    load_local_timezone: boolean;
}

export interface Toolbar {
    show_date_range: boolean;
    show_timezone_btn: boolean;
    show_language_btn: boolean;
    show_subscribe_btn: boolean;
    show_print_btn: boolean;
}

export interface Translations {
    language: string;
    custom: any[];
}

export interface DynamicStatus {
    enabled: boolean;
    days: number;
}

export interface Event {
    dynamic_status: DynamicStatus;
}

export interface Branding {
    calendar_icon: any[];
}

export interface CustomMetaTags {
    description?: any;
    keywords?: any;
    hide_calendar_from_robots: boolean;
}

export interface MiscSettings {
    show_preferred: boolean;
    position?: any;
    language: string;
    tickets_text: string;
    max_pages: number;
    equal_rows: boolean;
    event_url_format?: any;
    slider_delay: number;
}

export interface Features {
    add_google_analytics: number;
    advanced_themes: number;
    analytics_reporting: number;
    autoshare_facebook: number;
    autoshare_twitter: number;
    browser_extension: number;
    custom_domain: number;
    custom_header_footer: number;
    custom_meta_tags: number;
    custom_template: number;
    custom_theme: number;
    customer_products: number;
    disable_export_feeds: number;
    disable_timely_ga: number;
    embed_limit: number;
    event_finder: number;
    event_url_format: number;
    external_ticket: number;
    favorite_events: number;
    featured_events: number;
    filter_advanced: number;
    filter_by_organizer: number;
    filter_by_venue: number;
    filter_custom_groups: number;
    frontend_submissions: number;
    frontend_submissions_custom_fields: number;
    import_feeds_file: number;
    import_feeds_synced: number;
    keyword_search: number;
    multi_language: number;
    newsletter_mailchimp: number;
    number_of_users: number;
    relabelling: number;
    server_side_embedding: number;
    theme_naos: number;
    ticketing: number;
    ticketing_custom_fields: number;
    ticketing_multi_billing: number;
    ticketing_promotional_code: number;
    ticketing_qr_code: number;
    user_activity_log: number;
    view_agenda: number;
    view_carousel: number;
    view_clean_list: number;
    view_clean_row: number;
    view_map: number;
    view_modern_list: number;
    view_modern_row: number;
    view_month: number;
    view_posterboard: number;
    view_slider: number;
    view_stream: number;
    view_tile: number;
    view_week: number;
    view_year: number;
    white_label: number;
}

export interface Data {
    id: number;
    title: string;
    product: string;
    calendar_url: string;
    calendar_url_default: string;
    default_account_billing_id?: any;
    default_account_billing?: any;
    api_key?: any;
    design_customizations: DesignCustomizations;
    google_analytics: GoogleAnalytics;
    fes: Fes;
    date: Date;
    time: Time;
    toolbar: Toolbar;
    translations: Translations;
    event: Event;
    url?: any;
    timezone: string;
    twitter_notice_interval?: any;
    twitter_account?: any;
    post_to_twitter_default: boolean;
    mailchimp_api_key?: any;
    google_maps_api_key?: any;
    disable_export_feeds: boolean;
    facebook_notice_interval?: any;
    facebook_account?: any;
    post_to_facebook_default: boolean;
    relabelling?: any;
    taxonomies_visible?: any;
    taxonomies_pre_selected?: any;
    active_theme?: any;
    themes?: any;
    branding: Branding;
    date_time_formats?: any;
    custom_meta_tags: CustomMetaTags;
    calendar_filters: any[];
    expand_filters: boolean;
    filter_style?: any;
    show_filters: boolean;
    misc_settings: MiscSettings;
    social: boolean;
    default_view: string;
    default_mobile_view: string;
    featured_tags?: any;
    week_start: number;
    enabled_posterboard: boolean;
    enabled_tile: boolean;
    enabled_stream: boolean;
    enabled_agenda: boolean;
    enabled_year: boolean;
    enabled_month: boolean;
    enabled_week: boolean;
    enabled_map: boolean;
    enabled_modern_list: boolean;
    enabled_modern_row: boolean;
    enabled_clean_list: boolean;
    enabled_clean_row: boolean;
    enabled_mobile_posterboard: boolean;
    enabled_mobile_tile: boolean;
    enabled_mobile_stream: boolean;
    enabled_mobile_agenda: boolean;
    enabled_mobile_year: boolean;
    enabled_mobile_month: boolean;
    enabled_mobile_week: boolean;
    enabled_mobile_map: boolean;
    enabled_mobile_modern_list: boolean;
    enabled_mobile_modern_row: boolean;
    enabled_mobile_clean_list: boolean;
    enabled_mobile_clean_row: boolean;
    lazy_load: boolean;
    show_more: boolean;
    page_limit: number;
    max_pages: number;
    has_end_date: boolean;
    tile_width: number;
    max_width: number;
    week_day_start: number;
    week_day_end: number;
    show_slider: boolean;
    slider_delay: number;
    calendar_logo_images?: any;
    features: Features;
    canonical_url: string;
}

export interface CalendarInfoInterface {
    data: Data;
}
