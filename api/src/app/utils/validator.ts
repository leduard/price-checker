import { validate, ValidatorOptions } from "class-validator";

type Constraints = {
    field: string;
    messages: string[];
};

type ValidatorError = {
    object?: object;
    constraints?: Constraints[];
};

export default class Validator {
    static async validate(
        object: object,
        options?: ValidatorOptions
    ): Promise<ValidatorError | undefined> {
        const errors = await validate(object, options);

        if (errors.length) {
            const object = errors.find(Boolean)?.target;
            const constraints: Constraints[] = [];

            for (const error of errors) {
                const field = error?.property;
                const messages = !!error?.constraints
                    ? Object.values(error.constraints)
                    : [];

                // handles children (nested objects errors)
                if (error?.children?.length) {
                    for (const children of error.children) {
                        const nestedConstraint = children?.constraints || {};

                        if (!!Object.keys(nestedConstraint)) {
                            messages.push(...Object.values(nestedConstraint));
                        }
                    }
                }

                constraints.push({ field, messages });
            }

            return { object, constraints };
        }

        return;
    }
}
