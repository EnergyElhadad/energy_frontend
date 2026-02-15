export interface HeroT {
    id:          number;
    title:       string;
    button?:      string;
    banner_text: string;
    image:       string;
    link:        string;
    placement?:   string;
    order?:       number;
    created_at?:  Date;
}
