export interface CountryData {
    [countryCode: string]: {
        Name: string;
        Capital: {
            DLST: string;
            TD: number;
            Flg: number;
            Name: string;
            GeoPt: number[];
        };
        GeoRectangle: {
            West: number;
            East: number;
            North: number;
            South: number;
        };
        SeqID: number;
        GeoPt: number[];
        TelPref: string;
        CountryCodes: {
            tld: string;
            iso3: string;
            iso2: string;
            fips: string;
            isoN: number;
        };
        CountryInfo: string;
    };
}