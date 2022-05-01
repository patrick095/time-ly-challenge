import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
    let service: BaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BaseService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.get(BaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a get method', () => {
        expect(service.get).toBeTruthy();
    });

    it('should have a post method', () => {
        expect(service.post).toBeTruthy();
    });

    it('should have a put method', () => {
        expect(service.put).toBeTruthy();
    });

    it('should have a delete method', () => {
        expect(service.delete).toBeTruthy();
    });

    it('should have a patch method', () => {
        expect(service.patch).toBeTruthy();
    });

    it('should return a Observable<T> when calling get', () => {
        const url = 'url';
        service.get(url).subscribe((data) => {
            expect(data).toBeTruthy();
        });
    });

    it('should return a Observable<T> when calling post', () => {
        const url = 'url';
        service.post(url, {}).subscribe((data) => {
            expect(data).toBeTruthy();
        });
    });

    it('should return a Observable<T> when calling put', () => {
        const url = 'url';
        service.put(url, {}).subscribe((data) => {
            expect(data).toBeTruthy();
        });
    });

    it('should return a Observable<T> when calling delete', () => {
        const url = 'url';
        service.delete(url).subscribe((data) => {
            expect(data).toBeTruthy();
        });
    });

    it('should return a Observable<T> when calling patch', () => {
        const url = 'url';
        service.patch(url, {}).subscribe((data) => {
            expect(data).toBeTruthy();
        });
    });
});
