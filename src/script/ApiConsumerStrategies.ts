// region Interfaces
export interface Strategy{
    fetchData(url : string) : Promise<string>;
    formatData(data : any) : string;
}

// region Country Population
interface PopulationCountData {
    year: number,
    value: number
}

interface CountryData {
    country: string,
    code: string,
    iso3: string,
    populationCounts: PopulationCountData[]
}

interface PopulationData {
    msg: string,
    data: CountryData[]
}

// endregion CountryPopulation

// region AnimeRecommendation
interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

interface AnimeImages {
    jpg: ImageUrls;
    webp: ImageUrls;
}

interface AnimeEntry {
    mal_id: number;
    url: string;
    images: AnimeImages;
    title: string;
}

interface User {
    url: string;
    username: string;
}

interface AnimeRecommendationData {
    mal_id: string;
    entry: AnimeEntry[];
    content: string;
    date: string;
    user: User;
}

// endregion AnimeRecommendation

// region AnimeRandom

export interface AnimeRandomData {
    data: Data;
}

export interface Data {
    mal_id:          number;
    url:             string;
    images:          { [key: string]: Image };
    approved:        boolean;
    titles:          Title[];
    title:           string;
    title_english:   string;
    title_japanese:  string;
    title_synonyms:  any[];
    type:            string;
    chapters:        null;
    volumes:         null;
    status:          string;
    publishing:      boolean;
    published:       Published;
    score:           number;
    scored:          number;
    scored_by:       number;
    rank:            number;
    popularity:      number;
    members:         number;
    favorites:       number;
    synopsis:        string;
    background:      string;
    authors:         Author[];
    serializations:  Author[];
    genres:          Author[];
    explicit_genres: any[];
    themes:          Author[];
    demographics:    any[];
}

export interface Author {
    mal_id: number;
    type:   string;
    name:   string;
    url:    string;
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}

export interface Published {
    from:   Date;
    to:     null;
    prop:   Prop;
    string: string;
}

export interface Prop {
    from: From;
    to:   From;
}

export interface From {
    day:   number | null;
    month: number | null;
    year:  number | null;
}

export interface Title {
    type:  string;
    title: string;
}

// endregion AnimeRandom

// region MangaRandom

export interface MangaRandomData {
    data: Data;
}

export interface Data {
    mal_id:          number;
    url:             string;
    images:          { [key: string]: Image };
    approved:        boolean;
    titles:          Title[];
    title:           string;
    //@ts-ignore
    title_english:   null;
    title_japanese:  string;
    //@ts-ignore
    title_synonyms:  string[];
    type:            string;
    chapters:        null;
    //@ts-ignore
    volumes:         number;
    status:          string;
    publishing:      boolean;
    published:       Published;
    //@ts-ignore
    score:           null;
    //@ts-ignore
    scored:          null;
    //@ts-ignore
    scored_by:       null;
    rank:            number;
    popularity:      number;
    members:         number;
    favorites:       number;
    synopsis:        string;
    background:      string;
    authors:         Author[];
    serializations:  Author[];
    // @ts-ignore
    genres:          any[];
    explicit_genres: any[];
    // @ts-ignore
    themes:          any[];
    // @ts-ignore
    demographics:    Author[];
}

export interface Author {
    mal_id: number;
    type:   string;
    name:   string;
    url:    string;
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}

export interface Published {
    from:   Date;
    to:     null;
    prop:   Prop;
    string: string;
}

export interface Prop {
    from: From;
    to:   From;
}

export interface From {
    day:   number | null;
    month: number | null;
    year:  number | null;
}

export interface Title {
    type:  string;
    title: string;
}

// endregion MangaRandom

// endregion

// region Strategies
class CountryPopulationStrategy implements Strategy{
    formatData(data: PopulationData): string {
        let body = [];
        body.push(`<br>Msg is: ${data.msg}`);
        data.data.forEach(item => {
            body.push("<br>==============================<br>");
            body.push(`Country: ${item.country}`);
            body.push("°°°°°°°°°°°°°°°°°°°°°°°°°°°");
            body.push(`Code: ${item.code}`);
            body.push("°°°°°°°°°°°°°°°°°°°°°°°°°°°");
            body.push("<br>------------------------------");
            body.push(`<strong>Population Counts:</strong>`);
            item.populationCounts.forEach(p => {
                body.push("")
                body.push(`Year: ${p.year}`);
                body.push(`Value: ${p.value}`);
                body.push("")
            });
            body.push("<br>------------------------------");
        });
        body.push("<br>==============================");

        return body.join("<br>");
    }
    async fetchData(url : string){
        let body = 'Sin datos consumidos aún Y Y';

        const data =  await fetch(url)
            .then(r => r.json())
            .then(data => data as PopulationData)
            .catch(error => {
                console.error(error);
                body = ("Ocurrieron errores mientras se consumía la API Y Y")
            });

        if(data){
            body = this.formatData(data);
        }

        return body;
    }
}

// @ts-ignore
class AnimeRecommendationStrategy implements Strategy{
    private formatSection(title: string, content: string | number | undefined): string {
        return `<br><strong>${title}:</strong> ${content || 'N/A'}`;
    }

    private formatImageSection(images: any): string {
        return images && images['jpg'] ? `<br><img src="${images['jpg'].image_url}" alt="Image">` : '';
    }

    private formatData(data: AnimeRecommendationData[]): string {
        let body = [];
        //@ts-ignore
        data.data.forEach(item => {
            body.push("<br>==============================");
            body.push(this.formatSection('Content', item.content));
            body.push(this.formatSection('Date', item.date));
            body.push(`<br>User: <a href="${item.user.url}">${item.user.username}</a>`);
            item.entry.forEach(anime => {
                body.push("<br>------------------------------");
                body.push(this.formatSection('Title', anime.title));
                body.push(this.formatSection('URL', `<a href="${anime.url}">${anime.url}</a>`));
                body.push(this.formatImageSection(anime.images));
            });
            body.push("<br>==============================");
        });

        return body.join("<br>");
    }

    public async fetchData(url: string): Promise<string> {
        let body = 'Sin datos consumidos aún Y Y';

        const data =  await fetch(url)
            .then(r => r.json())
            .then(data => data as Array<AnimeRecommendationData>)
            .catch(error => {
                console.error(error);
                body = ("Ocurrieron errores mientras se consumía la API Y Y")
            });

        if(data){
            body = this.formatData(data);
        }

        return body;
    }
}
class AnimeRandomStrategy implements Strategy {
    private formatSection(title: string, content: string | number | undefined): string {
        return `<br><strong>${title}:</strong> ${content || 'N/A'}`;
    }

    private formatArraySection(title: string, array: any[], key: string): string {
        return array && array.length > 0 ? `<br><strong>${title}:</strong> ${array.map(item => item[key]).join(', ')}` : '';
    }

    private formatImageSection(images: any): string {
        return images && images['jpg'] ? `<br><img src="${images['jpg'].image_url}" alt="Image">` : '';
    }

    formatData(data: AnimeRandomData): string {
        const anime = data.data;
        let body = [];

        body.push(`<br>==============================`);
        body.push(this.formatSection('Title', anime.title));
        body.push(this.formatSection('English Title', anime.title_english));
        body.push(this.formatSection('Japanese Title', anime.title_japanese));
        body.push(this.formatImageSection(anime.images));
        body.push(this.formatSection('Score', anime.score !== null ? `${anime.score} (${anime.scored_by} users)` : 'N/A'));
        body.push(this.formatSection('Rank', anime.rank));
        body.push(this.formatSection('Popularity', anime.popularity));
        body.push(this.formatSection('Status', anime.status));
        body.push(this.formatSection('Publishing', anime.publishing ? 'Yes' : 'No'));
        body.push(this.formatSection('Published', anime.published?.string));
        body.push(this.formatSection('Synopsis', anime.synopsis || 'No synopsis available.'));
        body.push(this.formatArraySection('Authors', anime.authors, 'name'));
        body.push(this.formatArraySection('Serializations', anime.serializations, 'name'));
        body.push(this.formatArraySection('Genres', anime.genres, 'name'));
        body.push(this.formatSection('URL', `<a href="${anime.url}">${anime.url}</a>`));
        body.push(`<br>==============================`);

        return body.join("<br>");
    }


    public async fetchData(url: string): Promise<string> {
        let body = 'Aun no se fetchea Y Y';

        const data = await fetch(url)
            .then(r => r.json())
            .then(data => data as AnimeRandomData)
            .catch(error => {
            console.error(error);
            body = "Falló la petición Y Y";
        });

        if(data){
            body = this.formatData(data);
        }

        return body;
    }
}

class MangaRandomStrategy implements Strategy {
    private formatSection(title: string, content: string | number | undefined): string {
        return `<br><strong>${title}:</strong> ${content || 'N/A'}`;
    }

    private formatArraySection(title: string, array: any[], key: string): string {
        return array && array.length > 0 ? `<br><strong>${title}:</strong> ${array.map(item => item[key]).join(', ')}` : '';
    }

    private formatImageSection(title: string, images: any): string {
        return images && images['jpg'] ? `<br><strong>${title}:</strong> <img src="${images['jpg'].image_url}" alt="Image">` : '';
    }

    formatData(data: MangaRandomData): string {
        const manga = data.data;
        let body = [];

        body.push(`<br>==============================`);
        body.push(this.formatSection('Title', manga.title));
        body.push(this.formatSection('English Title', manga.title_english));
        body.push(this.formatSection('Japanese Title', manga.title_japanese));
        body.push(this.formatImageSection('', manga.images));
        body.push(this.formatSection('Type', manga.type));
        body.push(this.formatSection('Status', manga.status));
        body.push(this.formatSection('Publishing', manga.publishing ? 'Yes' : 'No'));
        body.push(this.formatSection('Published', manga.published?.string));
        body.push(this.formatSection('Score', manga.score !== null ? `${manga.score} (${manga.scored_by || 'N/A'} users)` : 'N/A'));
        body.push(this.formatSection('Rank', manga.rank));
        body.push(this.formatSection('Popularity', manga.popularity));
        body.push(this.formatSection('Members', manga.members));
        body.push(this.formatSection('Favorites', manga.favorites));
        body.push(this.formatSection('Synopsis', manga.synopsis || 'No synopsis available.'));
        body.push(this.formatSection('Background', manga.background || 'No background information.'));
        body.push(this.formatArraySection('Authors', manga.authors, 'name'));
        body.push(this.formatArraySection('Serializations', manga.serializations, 'name'));
        body.push(this.formatArraySection('Genres', manga.genres, 'name'));
        body.push(this.formatArraySection('Themes', manga.themes, 'name'));
        body.push(this.formatArraySection('Demographics', manga.demographics, 'name'));
        body.push(this.formatSection('URL', `<a href="${manga.url}">${manga.url}</a>`));
        body.push(`<br>==============================`);

        return body.join("<br>");
    }
    public async fetchData(url: string): Promise<string> {
        let body: string;

        try {
            const response = await fetch(url);
            const data: MangaRandomData = await response.json();
            body = this.formatData(data);
        } catch (error) {
            console.error(error);
            body = "An error occurred while fetching the API";
        }

        return body;
    }
}

// endregion

export {CountryPopulationStrategy, AnimeRecommendationStrategy, AnimeRandomStrategy, MangaRandomStrategy};