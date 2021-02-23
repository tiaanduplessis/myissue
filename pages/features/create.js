import Head from "next/head"
import { useRouter } from "next/router"
import { mutate } from "swr"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';

import {
    ButtonGroup,
    Button,
    Flex,
    FormControl,
    Input,
    FormLabel,
    Textarea,
    Radio,
    Stack,
    RadioGroup,
    FormErrorMessage,
    FormHelperText,
    useToast,
} from "@chakra-ui/react"

import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"

import { createFeature } from "@/lib/db"

import { PRIMARY_COLOR_SCHEME } from "@/styles/theme"

import { featuresCreateSchema } from "@/schemas/features-create-schema"

const FeaturesCreate = () => {
    const toast = useToast()
    const { user } = useAuth()
    const router = useRouter()

    const { register, handleSubmit, errors, control } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(featuresCreateSchema),
        defaultValues: {
            type: "feature",
            priority: "low",
        },
    })

    const { projectId } = router.query

    const backURL = `/features${projectId ? `?projectId=${projectId}` : ""}`

    const onCreateFeature = ({ share, ...values }) => {
        const feature = {
            authorId: user?.uid || null,
            projectId: projectId || null,
            createdAt: new Date().toISOString(),
            ...values
        }

        const key = projectId ? `/api/projects/${projectId}/features` : "/api/features"
        mutate(
            key,
            (data) => {
                return { features: [feature, ...(data?.features ?? [])] }
            },
            false
        )
        toast({
            title: "Success!",
            description: "We've created your feature.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
        createFeature(feature).then(() => mutate(key))
        router.push(backURL)
    }

    return (
        <PageLayout
            title="Create a feature"
            breadcrumbs={[{ label: "Features", href: backURL }, { label: "Create" }]}
        >
            <Head>
                <title>Create new feature</title>
            </Head>

            <Flex
                width="100%"
                backgroundColor="white"
                borderRadius="md"
                boxShadow="sm"
                p={{
                    base: 5,
                    md: 10,
                }}
                direction="column"
                as="form"
                onSubmit={handleSubmit(onCreateFeature)}
            >

                <FormControl>
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <Controller
                        as={
                            <RadioGroup
                                id="type"
                                name="type"
                                ref={register}
                                defaultValue="feature"
                            >
                                <Stack spacing={2}>
                                    <Radio value="feature">Feature</Radio>
                                    <Radio value="epic">Epic</Radio>
                                </Stack>
                            </RadioGroup>
                        }
                        name="type"
                        control={control}
                    />
                </FormControl>

                <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.problem?.message?.length > 0}>
                    <FormLabel htmlFor="problem">Problem statement</FormLabel>

                    <Input
                        id="problem"
                        placeholder="The user can not sign in using Google..."
                        name="problem"
                        ref={register}
                    />
                    {errors.problem?.message ? <FormErrorMessage>{errors.problem?.message}</FormErrorMessage> :<FormHelperText>
                        Describe the problem that the user has.
                    </FormHelperText> }
                    
                    
                </FormControl>

                <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.impact?.message?.length > 0}>
                    <FormLabel htmlFor="impact">Impact on user</FormLabel>
                    <Textarea
                        size="lg"
                        id="impact"
                        placeholder={"User's without a Google account can not sign in to the platform..."}
                        name="impact"
                        ref={register}
                    />

                    {errors.impact?.message ? <FormErrorMessage>{errors.impact?.message}</FormErrorMessage> :<FormHelperText>
                    Describe the impact this has on the user.
                    </FormHelperText> }
                </FormControl>



                <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.cost?.message?.length > 0}>
                    <FormLabel htmlFor="cost">Cost</FormLabel>
                    <Textarea
                        size="lg"
                        id="cost"
                        placeholder={"We loose 100s of potential customers who only have a Google account"}
                        name="cost"
                        ref={register}
                    />
        
                    {errors.cost?.message ? <FormErrorMessage>{errors.cost?.message}</FormErrorMessage> :<FormHelperText>
                    Describe the cost of not doing this request.
                    </FormHelperText> }
                </FormControl>



                <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.goal?.message?.length > 0}>
                    <FormLabel htmlFor="goal">Business goal</FormLabel>
                    <Input
                        id="goal"
                        placeholder="Increase user sign ups by 10%..."
                        name="goal"
                        ref={register}
                    />
                    {errors.goal?.message ? <FormErrorMessage>{errors.goal?.message}</FormErrorMessage> :<FormHelperText>
                    What business goal does the request help us fulfill.
                    </FormHelperText> }
                </FormControl>

                <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.need?.message?.length > 0}>
                    <FormLabel htmlFor="need">Need for solution</FormLabel>
                    <Textarea
                        size="lg"
                        id="need"
                        placeholder="After conducting user testing, we've found..."
                        name="need"
                        ref={register}
                    />
                    {errors.need?.message ? <FormErrorMessage>{errors.need?.message}</FormErrorMessage> :<FormHelperText>
                    Describe the evidence you have on the need to solve this request.
                    </FormHelperText> }
                </FormControl>

                <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.solution?.message?.length > 0}>
                    <FormLabel htmlFor="solution">Potential solution</FormLabel>
                    <Textarea
                        size="lg"
                        id="solution"
                        placeholder="Add a 'Sign-in with Google' button to the sign in page of the website..."
                        name="solution"
                        ref={register}
                    />
                    {errors.solution?.message ? <FormErrorMessage>{errors.solution?.message}</FormErrorMessage> :<FormHelperText>
                    Describe any ideas you have on a potential solution.
                    </FormHelperText> }
                </FormControl>

                <FormControl mt={10}>
                    <FormLabel htmlFor="priority">Priority</FormLabel>

                    <Controller
                        as={
                            <RadioGroup
                                id="priority"
                                name="priority"
                                ref={register}
                                defaultValue="low"
                            >
                                <Stack spacing={2}>
                                    <Radio value="low">Low</Radio>
                                    <Radio value="medium">Medium</Radio>
                                    <Radio value="high">High</Radio>
                                </Stack>
                            </RadioGroup>
                        }
                        name="priority"
                        control={control}
                    />
                </FormControl>

                <ButtonGroup mt={20} size="lg" spacing={4}>
                    <Button colorScheme={PRIMARY_COLOR_SCHEME} fontWeight="medium" type="submit">
                        Create
                    </Button>
                </ButtonGroup>
            </Flex>
        </PageLayout>
    )
}

export default FeaturesCreate
