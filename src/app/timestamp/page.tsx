"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import {
  PrimaryButton,
  PrimaryOutlineButton,
  SecondaryButton,
} from "@/components/fundamental/Buttons";
import CommonUtils from "@/utils/CommonUtils";
import { DefaultInput } from "@/components/fundamental/InputField";
import { DefaultTextarea } from "@/components/fundamental/TextareaField";

const jsDateToString = (
  date: Date,
  utc = false,
  includeMilliseconds = false
): string => {
  var str =
    date.getFullYear() +
    "-" +
    ("0" + (utc ? date.getUTCMonth() + 1 : date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + (utc ? date.getUTCDate() : date.getDate())).slice(-2) +
    " " +
    ("0" + (utc ? date.getUTCHours() : date.getHours())).slice(-2) +
    ":" +
    ("0" + (utc ? date.getUTCMinutes() : date.getMinutes())).slice(-2) +
    ":" +
    ("0" + (utc ? date.getUTCSeconds() : date.getSeconds())).slice(-2);
  if (includeMilliseconds) {
    str +=
      "." +
      ("00" + (utc ? date.getUTCMilliseconds() : date.getMilliseconds())).slice(
        -3
      );
  }
  return str;
};

function TimestampPage() {
  const [currentTimestamp, setCurrentTimestamp] = useState<Date>(new Date());
  const [quickTimestamp, setQuickTimestamp] = useState(0);
  const [quickTimestring, setQuickTimestring] = useState("");
  const [batchTimestamp, setBatchTimestamp] = useState("");
  const [batchTimestring, setBatchTimestring] = useState("");

  useEffect(() => {
    setCurrentTimestamp(new Date());
    const intervalId = setInterval(function () {
      setCurrentTimestamp(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const onTimestampBatchConvertClick = () => {
    let timestampList = batchTimestamp.split("\n");
    let resultList = [];
    for (var i = 0; i < timestampList.length; i++) {
      let currentTimestampValue = isNaN(Number(timestampList[i]))
        ? 0
        : Number(timestampList[i]);
      var length = currentTimestampValue.toString().length;
      if (isNaN(currentTimestampValue) || (length !== 10 && length !== 13)) {
        resultList.push("invalid");
        continue;
      }
      if (length === 10) {
        currentTimestampValue *= 1000;
      }
      var date = new Date(currentTimestampValue);
      var datetimeString = jsDateToString(date, false, true);
      resultList.push(datetimeString);
    }
    setBatchTimestring(resultList.join("\n"));
  };

  const onDatetimeBatchConvertClick = () => {
    let datetimeList = batchTimestring.split("\n");
    let resultList = [];
    for (var i = 0; i < datetimeList.length; i++) {
      let currentTimestampValue = Date.parse(datetimeList[i]);
      if (!currentTimestampValue || currentTimestampValue < 0) {
        resultList.push("invalid");
        continue;
      }
      resultList.push(currentTimestampValue);
    }
    setBatchTimestamp(resultList.join("\n"));
  };

  return (
    <div className="container mx-auto mb-10 max-w-screen-lg">
      <PageTitle pageTitle={"Timestamp Converter"} />
      <div className="flex flex-col lg:flex-row justify-evenly items-center">
        <div className="flex flex-col items-center">
          <div
            className="font-bold text-primary text-5xl my-5"
            suppressHydrationWarning
          >
            {Math.round(currentTimestamp.getTime() / 1000)}
          </div>
          <div className="mb-5">
            Current timestamp since <b>midnight of Jan 01, 1970 UTC</b>
          </div>
          <PrimaryOutlineButton
            onClick={() =>
              CommonUtils.copyToClipboard(
                `${Math.round(currentTimestamp.getTime() / 1000)}`
              )
            }
          >
            COPY
          </PrimaryOutlineButton>
        </div>
        <div className="flex flex-col items-center">
          <div>
            current <b>local</b> time
          </div>
          <div
            className="font-bold text-gray-800 text-3xl my-3"
            suppressHydrationWarning
          >
            {jsDateToString(currentTimestamp)}
          </div>
          <div>
            current <b>UTC/GMT</b> time
          </div>
          <div
            className="font-bold text-gray-800 text-3xl my-3"
            suppressHydrationWarning
          >
            {jsDateToString(currentTimestamp, true)}
          </div>
        </div>
      </div>
      <div className="font-bold text-3xl mt-10 mb-5 text-left">
        Quick Conversion
      </div>
      <div className="grid grid-flow-col gap-5 justify-stretch items-center">
        <div className="text-center">
          <DefaultInput
            title="Timestamp"
            value={quickTimestamp.toString()}
            tip="in seconds or milliseconds"
            onChange={(val: string) =>
              setQuickTimestamp(isNaN(Number(val)) ? 0 : Number(val))
            }
          ></DefaultInput>
          <PrimaryButton
            onClick={() =>
              setQuickTimestring(
                jsDateToString(
                  new Date(
                    `${quickTimestamp}`.length === 10
                      ? quickTimestamp * 1000
                      : quickTimestamp
                  )
                )
              )
            }
          >
            CONVERT TO DATETIME
          </PrimaryButton>
        </div>
        <div className="text-center">
          <DefaultInput
            title="Datetime String"
            value={quickTimestring}
            tip="in yyyy-MM-dd hh:mm:ss format"
            onChange={(val: string) => setQuickTimestring(val)}
          ></DefaultInput>
          <SecondaryButton
            onClick={() => setQuickTimestamp(Date.parse(quickTimestring))}
          >
            CONVERT TO TIMESTAMP
          </SecondaryButton>
        </div>
      </div>
      <div className="font-bold text-3xl mt-10 mb-5 text-left">
        Batch Conversion
      </div>
      <div className="grid grid-flow-col gap-5 justify-stretch items-center">
        <div className="text-center">
          <DefaultTextarea
            size="md"
            title="Timestamp"
            value={batchTimestamp}
            tip="one timestamp per line"
            onChange={(val: string) => setBatchTimestamp(val)}
          ></DefaultTextarea>
          <PrimaryButton onClick={onTimestampBatchConvertClick}>
            CONVERT TO DATETIME
          </PrimaryButton>
        </div>
        <div className="text-center">
          <DefaultTextarea
            size="md"
            title="Datetime String"
            value={batchTimestring}
            tip="one datetime per line"
            onChange={(val: string) => setBatchTimestring(val)}
          ></DefaultTextarea>
          <SecondaryButton onClick={onDatetimeBatchConvertClick}>
            CONVERT TO TIMESTAMP
          </SecondaryButton>
        </div>
      </div>
      <p className="mt-10 text-lg" role="page-text-content">
        <b>What is a unix timestamp?</b>
        <br />
        In computer science, timestamps act as digital footprints, meticulously
        recording the exact moment a specific event transpired within a system.
        These events encompass a wide range, from the humble creation or
        modification of a file to the critical transmission and reception of a
        network message. Unlike the subjective nature of human perception,
        timestamps are represented numerically, ensuring an objective and
        machine-readable record of time.
        <br />
        <br />
        Common representations include seconds elapsed since a designated
        reference point, often the Unix Epoch (January 1st, 1970, 00:00:00 UTC),
        or alternatively, milliseconds elapsed since an arbitrary starting time.
        This numerical precision underpins a multitude of critical tasks within
        a system. For instance, timestamps facilitate data versioning by
        pinpointing the exact moment a file was modified, enabling users to
        revert to previous versions if necessary.
        <br />
        <br />
        Furthermore, timestamps play a pivotal role in log analysis, which
        involves scrutinizing system activity. By meticulously recording
        timestamps for events like program execution or system errors,
        administrators can reconstruct the sequence of events, aiding in
        troubleshooting and identifying potential security vulnerabilities. The
        temporal order maintained by timestamps is equally crucial. Imagine a
        scenario where multiple processes compete for access to a shared
        resource. Timestamps allow the system to definitively determine the
        order in which processes requested access, ensuring fair and efficient
        resource allocation.
        <br />
        <br />
        Finally, the format of a timestamp can vary depending on the specific
        application. Popular choices include Unix timestamps, which offer a
        concise numerical representation, ISO 8601 timestamps, known for their
        human-readable format (YYYY-MM-DDTHH:mm:ssZ), and milliseconds since
        epoch, which provides high precision for time-sensitive operations. In
        essence, timestamps are the silent guardians of time within a computer
        system, meticulously recording events and ensuring temporal order,
        thereby facilitating a wide range of critical tasks for developers and
        system administrators alike.
      </p>

      <div className="font-bold text-2xl mt-5 mb-2" role="page-text-content">
        The year 2038 problem
      </div>
      <p role="page-text-content">
        Some systems store the unix timestamp as a 32-bit integer, which has a
        upper limit of 2147483647, equivalent to 2038-01-19 03:14:07 UTC. All
        32-bit representations will overflow and cease to work after that time.
        In order to prevent system errors, all 32-bit representations will need
        to upgrade to 64-bit representation. For further readings, please refer
        to the&quot;
        <a
          href="https://en.wikipedia.org/wiki/Year_2038_problem"
          target="_blank"
          rel="noreferrer"
        >
          &quot;Year 2038 problem&quot;
        </a>
        &quot; wiki page.
      </p>
    </div>
  );
}

export default TimestampPage;
