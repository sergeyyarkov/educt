import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  arrayUnique,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsContactsValidConstraint implements ValidatorConstraintInterface {
  validate(contacts: { name: string; link: string }[]) {
    const names = contacts.map((contact) => contact.name);
    let valid = false;

    if (contacts.length === 0) {
      return true;
    }

    if (arrayUnique(names)) {
      (function () {
        for (let i = 0; i < contacts.length; i++) {
          switch (contacts[i].name) {
            case 'vk':
              if (
                contacts[i].link.match(
                  /^(https?:\/\/)?(www\.)?vk\.com\/(\w|\d)+?\/?$/
                )
              ) {
                valid = true;
              } else {
                valid = false;
                return;
              }
              break;
            case 'telegram':
              if (
                contacts[i].link.match(
                  /.*\B@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/gm
                )
              ) {
                valid = true;
              } else {
                valid = false;
                return;
              }
              break;
            default:
              break;
          }
        }
      })();
    }

    return valid;
  }
}

export function IsContactsValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsContactsValidConstraint,
    });
  };
}
