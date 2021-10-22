import Flex from "./global/Flex";
import Text from "./global/Text";
import Input from "./global/Input";
import Button from "./global/Button";

const TimeBlock = ({getFromTime, getToTime,onDateSubmit}) => {
    return (
        <div className="my-8">
            <Flex className={'mx-auto'} layouts={['col', 'col', 'col', 'row']}>
                <Flex layouts={['col', 'col', 'col', 'row']}>
                    <Flex layouts={['col']}>
                        <Text tag={'label'} type={'label'}>From Date</Text>
                        <Input type={'datetime-local'} onChange={getFromTime}/>
                    </Flex>

                    <Flex layouts={['col']} className={'sm:ml-0 lg:ml-2 sm:mt-0 mt-4'}>
                        <Text type={'label'} tag={'label'}>To Time</Text>
                        <Input type={'datetime-local'} onChange={getToTime}/>
                    </Flex>
                    <Button onClick={onDateSubmit} name={'Get Analytics'}/>

                </Flex>
            </Flex>
        </div>
    )
}

export default TimeBlock
