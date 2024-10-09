//! Refactorización

// region Interfaces
export interface Strategy {
    fetchData(url: string): Promise<string>;
    formatData(data: any): string;
}

// region Country Population
interface PopulationCountData {
    year: number;
    value: number;
}

interface CountryData {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCountData[];
}

interface PopulationData {
    msg: string;
    data: CountryData[];
}

// endregion Country Population

// region Anime Recommendation
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

// endregion Anime Recommendation

// region Anime Random
export interface AnimeRandomData {
    data: AnimeData;
}

export interface AnimeData {
    mal_id: number;
    url: string;
    images: Record<string, Image>;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    score: number | null;
    rank: number;
    popularity: number;
    synopsis: string;
    authors: Author[];
    genres: Author[];
}

export interface Author {
    mal_id: number;
    name: string;
    url: string;
}

export interface Image {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export interface Title {
    type: string;
    title: string;
}

// endregion Anime Random

// region Manga Random
export interface MangaRandomData {
    data: MangaData;
}

export interface MangaData {
    mal_id: number;
    url: string;
    images: Record<string, Image>;
    titles: Title[];
    title: string;
    title_english: string | null;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    score: number | null;
    rank: number;
    popularity: number;
    synopsis: string;
    authors: Author[];
    genres: Author[];
}

// endregion Manga Random

// region Utilities
class Formatter {
    static formatSection(title: string, content: string | number | undefined): string {
        return `<br><strong>${title}:</strong> ${content ?? 'N/A'}`;
    }

    static formatArraySection(title: string, array: any[], key: string): string {
        return array?.length > 0 ? `<br><strong>${title}:</strong> ${array.map(item => item[key]).join(', ')}` : '';
    }

    static formatImageSection(images: Record<string, Image> | AnimeImages): string {
        if ('jpg' in images && images.jpg) {
            return `<br><img src="${images.jpg.image_url}" alt="Image">`;
        }
        if ('images' in images && images.images?.jpg) {
            return `<br><img src="${images.images.jpg.image_url}" alt="Image">`;
        }
        return '<br>No image available';
    }
}
// endregion Utilities

// region Strategies
class CountryPopulationStrategy implements Strategy {
    formatData(data: PopulationData): string {
        const body: string[] = [`<br>Msg is: ${data.msg}`];

        data.data.forEach(item => {
            body.push(
                "<br>==============================<br>",
                `Country: ${item.country}`,
                "°°°°°°°°°°°°°°°°°°°°°°°°°°°",
                `Code: ${item.code}`,
                "°°°°°°°°°°°°°°°°°°°°°°°°°°°",
                "<br>------------------------------",
                `<strong>Population Counts:</strong>`
            );

            item.populationCounts.forEach(p => {
                body.push(`Year: ${p.year}`, `Value: ${p.value}`);
            });

            body.push("<br>------------------------------");
        });

        body.push("<br>==============================");
        return body.join("<br>");
    }

    async fetchData(url: string): Promise<string> {
        let body: string;
        try {
            const response = await fetch(url);
            const data: PopulationData = await response.json();
            body = this.formatData(data);
        } catch (error) {
            console.error(error);
            body = 'Ocurrieron errores mientras se consumía la API Y Y';
        }
        return body;
    }
}

class AnimeRecommendationStrategy implements Strategy {
    formatData(data: AnimeRecommendationData[]): string {
        const body: string[] = [];

        data.data.forEach(item => {
            body.push(
                "<br>==============================",
                Formatter.formatSection('Content', item.content),
                Formatter.formatSection('Date', item.date),
                `<br>User: <a href="${item.user.url}">${item.user.username}</a>`
            );

            item.entry.forEach(anime => {
                body.push(
                    "<br>------------------------------",
                    Formatter.formatSection('Title', anime.title),
                    Formatter.formatSection('URL', `<a href="${anime.url}">${anime.url}</a>`),
                    Formatter.formatImageSection(anime.images)
                );
            });

            body.push("<br>==============================");
        });

        return body.join("<br>");
    }

    async fetchData(url: string): Promise<string> {
        let body: string;
        try {
            const response = await fetch(url);
            const data: AnimeRecommendationData[] = await response.json();
            body = this.formatData(data);
        } catch (error) {
            console.error(error);
            body = 'Ocurrieron errores mientras se consumía la API Y Y';
        }
        return body;
    }
}

class AnimeRandomStrategy implements Strategy {
    formatData(data: AnimeRandomData): string {
        const anime = data.data;
        const body: string[] = [
            `<br>==============================`,
            Formatter.formatSection('Title', anime.title),
            Formatter.formatSection('English Title', anime.title_english),
            Formatter.formatSection('Japanese Title', anime.title_japanese),
            Formatter.formatImageSection(anime.images),
            Formatter.formatSection('Score', anime.score ? `${anime.score} (${anime.score})` : 'N/A'),
            Formatter.formatSection('Rank', anime.rank),
            Formatter.formatSection('Popularity', anime.popularity),
            Formatter.formatSection('Synopsis', anime.synopsis || 'No synopsis available.'),
            Formatter.formatArraySection('Authors', anime.authors, 'name'),
            Formatter.formatArraySection('Genres', anime.genres, 'name'),
            Formatter.formatSection('URL', `<a href="${anime.url}">${anime.url}</a>`),
            `<br>==============================`
        ];
        return body.join("<br>");
    }

    async fetchData(url: string): Promise<string> {
        let body: string;
        try {
            const response = await fetch(url);
            const data: AnimeRandomData = await response.json();
            body = this.formatData(data);
        } catch (error) {
            console.error(error);
            body = 'Falló la petición Y Y';
        }
        return body;
    }
}

class MangaRandomStrategy implements Strategy {
    formatData(data: MangaRandomData): string {
        const manga = data.data;
        const body: string[] = [
            `<br>==============================`,
            Formatter.formatSection('Title', manga.title),
            Formatter.formatSection('English Title', manga.title_english),
            Formatter.formatSection('Japanese Title', manga.title_japanese),
            Formatter.formatImageSection(manga.images),
            Formatter.formatSection('Score', manga.score ? `${manga.score} (${manga.score})` : 'N/A'),
            Formatter.formatSection('Rank', manga.rank),
            Formatter.formatSection('Popularity', manga.popularity),
            Formatter.formatSection('Synopsis', manga.synopsis || 'No synopsis available.'),
            Formatter.formatArraySection('Authors', manga.authors, 'name'),
            Formatter.formatArraySection('Genres', manga.genres, 'name'),
            Formatter.formatSection('URL', `<a href="${manga.url}">${manga.url}</a>`),
            `<br>==============================`
        ];
        return body.join("<br>");
    }

    async fetchData(url: string): Promise<string> {
        let body: string;
        try {
            const response = await fetch(url);
            const data: MangaRandomData = await response.json();
            body = this.formatData(data);
        } catch (error) {
            console.error(error);
            body = 'Falló la petición Y Y';
        }
        return body;
    }
}
// endregion Strategies

export { CountryPopulationStrategy, AnimeRecommendationStrategy, AnimeRandomStrategy, MangaRandomStrategy };