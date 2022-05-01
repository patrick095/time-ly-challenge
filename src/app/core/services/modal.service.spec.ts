import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ModalService],
        });
        service = TestBed.get(ModalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a open method', () => {
        expect(service.open).toBeTruthy();
    });

    it('should have a close method', () => {
        expect(service.close).toBeTruthy();
    });

    it('should have a modalData property', () => {
        expect(service.modalData).toBeTruthy();
    });

    it('should have a modalData property with type EventEmitter', () => {
        expect(service.modalData).toBeTruthy();
        expect(service.modalData.constructor.name).toBe('EventEmitter');
    });

    it('should emit null when calling close', () => {
        service.close();
        service.modalData.subscribe((data) => {
            expect(data).toBeNull();
        });
    });

    it('should emit data when calling open', () => {
        const modalMocky = {
            title: new Date(),
            data: [],
        };
        service.open(modalMocky);
        service.modalData.subscribe((data) => {
            expect(data).toEqual(modalMocky);
        });
    });
});
