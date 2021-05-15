export class Movie {

    constructor(
        public id?: number, 
        public title?: string,
        public genre?: string,
        public director?: string,
        public release?: string,
        public duration?: number,
        public imagelink?: string,
        public about?: string
    ) { }
}