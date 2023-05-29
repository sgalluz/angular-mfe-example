import { RequiredFormatter } from './required.formatter';
import { MinLengthFormatter } from './min-length.formatter';
import { MaxLengthFormatter } from './max-length.formatter';
import { MinFormatter } from './min.formatter';
import { MaxFormatter } from './max.formatter';

const errorFormatters = new RequiredFormatter();

errorFormatters
    .setNext(new MinLengthFormatter())
    .setNext(new MaxLengthFormatter())
    .setNext(new MinFormatter())
    .setNext(new MaxFormatter());

export default errorFormatters;