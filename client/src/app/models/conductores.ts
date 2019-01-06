import * as moment from 'moment';

export class Conductores {
    // constructor(id = '', name = '', CC = '', license = '', license_expiration = new Date()) {
    //     this._id = id;
    //     this.name = name;
    //     this.CC = CC;
    //     this.license = license;
    //     this.license_expiration = license_expiration;
    // }

    _id: string;
    name: string;
    CC: string;
    license: string;
    license_expiration: Date;
    health_expiration: Date;
    drug_expiration: Date;
    simit_expiration: Date;
    health_exam_expiration: Date;
    active: Boolean = true;
    internal: Boolean = true;
    driving_exam_expiration: Date;
    automotive_law_expiration: Date;
    transit_law_expiration: Date;
    law_tips_expiration: Date;
    accident_expiration: Date;
    driving_methods_expiration: Date;
    defensive_expiration: Date;
    distractions_expiration: Date;
    first_aid_expiration: Date;
    first_answer_expiration: Date;
    senses_expiration: Date;
    car_security_expiration: Date;
    road_security_expiration: Date;
    state: Boolean = true;




}
